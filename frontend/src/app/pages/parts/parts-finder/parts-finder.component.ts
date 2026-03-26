import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { VehicleService } from '../../../core/services/vehicle.service';
import { PartsService } from '../../../core/services/parts.service';
import { PartFilters } from '../../../core/models/models';
import { Part } from '../../../core/models/models';

@Component({
  selector: 'app-parts-finder',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="page-header">
      <div class="container">
        <h1>Buscador de <span>Refacciones</span></h1>
        <p>Selecciona tu vehículo para encontrar refacciones 100% compatibles</p>
      </div>
    </div>

    <div class="container page-body">

      <!-- VEHICLE SELECTOR -->
      <div class="vehicle-selector card">
        <h2>Tu vehículo</h2>
        <div class="selector-grid">
          <div class="form-input-group">
            <label>Marca</label>
            <select class="form-input" [(ngModel)]="sel.brand" (change)="onBrandChange()">
              <option value="">Selecciona la marca</option>
              <option *ngFor="let b of brands" [value]="b">{{ b }}</option>
            </select>
          </div>
          <div class="form-input-group">
            <label>Modelo</label>
            <select class="form-input" [(ngModel)]="sel.model" (change)="onModelChange()" [disabled]="!sel.brand">
              <option value="">Selecciona el modelo</option>
              <option *ngFor="let m of models" [value]="m">{{ m }}</option>
            </select>
          </div>
          <div class="form-input-group">
            <label>Año</label>
            <select class="form-input" [(ngModel)]="sel.year" (change)="onYearChange()" [disabled]="!sel.model">
              <option value="">Selecciona el año</option>
              <option *ngFor="let y of years" [value]="y">{{ y }}</option>
            </select>
          </div>
          <div class="form-input-group">
            <label>Motor</label>
            <select class="form-input" [(ngModel)]="sel.engine" [disabled]="!sel.year">
              <option value="">Selecciona el motor</option>
              <option *ngFor="let e of engines" [value]="e">{{ e }}</option>
            </select>
          </div>
        </div>
        <div class="sel-actions">
          <button class="btn btn-primary" (click)="searchParts()" [disabled]="!sel.brand">🔍 Buscar refacciones</button>
          <button class="btn btn-ghost" (click)="clearVehicle()">Limpiar</button>
        </div>
        <div class="selected-vehicle" *ngIf="activeVehicle">
          <span class="badge badge-success">✓ {{activeVehicle}}</span>
        </div>
      </div>

      <!-- FILTERS BAR -->
      <div class="filter-bar" *ngIf="searched">
        <div class="filter-bar-inner">
          <span class="filter-label">Filtrar por:</span>
          <select class="form-input compact" [(ngModel)]="partFilters.category" (change)="searchParts()">
            <option value="">Todas las categorías</option>
            <option *ngFor="let c of partCategories" [value]="c">{{ c }}</option>
          </select>
          <select class="form-input compact" [(ngModel)]="partFilters.sort" (change)="searchParts()">
            <option value="rating">Mejor calificados</option>
            <option value="price_asc">Precio: menor a mayor</option>
            <option value="price_desc">Precio: mayor a menor</option>
          </select>
          <input class="form-input compact" type="text" [(ngModel)]="partFilters.search" placeholder="Buscar refacción..." (keyup.enter)="searchParts()">
        </div>
      </div>

      <!-- RESULTS -->
      <div *ngIf="loading" class="spinner"></div>

      <div *ngIf="searched && !loading">
        <div class="results-meta">
          <span>{{ total }} refacciones encontradas</span>
        </div>
        <div class="grid-4" *ngIf="parts.length">
          <div class="card part-card fade-in-up" *ngFor="let p of parts" [routerLink]="['/refacciones', p.id]">
            <div class="part-img" [style.backgroundImage]="'url('+(p.image||fallback)+')'"></div>
            <div class="part-body">
              <span class="badge badge-primary part-cat">{{ p.category }}</span>
              <h3>{{ p.name }}</h3>
              <p class="part-brand">{{ p.brand }}</p>
              <div class="compat-info">
                <span class="badge badge-success" *ngIf="activeVehicle">✓ Compatible</span>
              </div>
              <div class="part-footer">
                <div class="price">\${{ p.price | number }}</div>
                <button class="btn btn-primary btn-sm">Ver detalles</button>
              </div>
              <p class="store-name">🏪 {{ p.store?.name || 'N/A' }}</p>
            </div>
          </div>
        </div>
        <div class="empty-state" *ngIf="!parts.length">
          <div class="icon">🔩</div>
          <h3>No encontramos refacciones</h3>
          <p>Intenta cambiar los filtros o seleccionar un vehículo diferente</p>
        </div>
        <div class="pagination" *ngIf="lastPage > 1">
          <button (click)="goPage(currentPage-1)" [disabled]="currentPage===1">←</button>
          <button *ngFor="let p of pages" (click)="goPage(p)" [class.active]="p===currentPage">{{ p }}</button>
          <button (click)="goPage(currentPage+1)" [disabled]="currentPage===lastPage">→</button>
        </div>
      </div>

      <div class="start-prompt" *ngIf="!searched && !loading">
        <div class="icon">🚗</div>
        <h3>Selecciona tu vehículo para comenzar</h3>
        <p>El sistema buscará refacciones 100% compatibles con tu carro</p>
      </div>
    </div>
  `,
  styles: [`
    .page-header {
      background: linear-gradient(135deg, #0f1014 0%, #0a1520 100%);
      padding: 48px 0 32px;
      border-bottom: 1px solid #1a2535;
      h1 { font-size: 2rem; font-weight: 800; margin-bottom: 6px; span { color: #8b5cf6; } }
      p { color: #a8b2c1; }
    }
    .page-body { padding: 32px 20px; }
    .vehicle-selector {
      padding: 28px; margin-bottom: 28px;
      h2 { font-size: 1.1rem; font-weight: 700; margin-bottom: 20px; }
    }
    .selector-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 16px; margin-bottom: 20px; @media(max-width:800px){ grid-template-columns: repeat(2,1fr); } @media(max-width:500px){ grid-template-columns: 1fr; } }
    .sel-actions { display: flex; gap: 12px; align-items: center; flex-wrap: wrap; }
    .selected-vehicle { margin-top: 12px; }
    .filter-bar { margin-bottom: 24px; }
    .filter-bar-inner { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; }
    .filter-label { font-size: 0.85rem; color: #a8b2c1; font-weight: 600; }
    .form-input.compact { width: auto; flex: 1; min-width: 140px; padding: 8px 12px; font-size: 0.85rem; }
    .results-meta { font-size: 0.9rem; color: #a8b2c1; margin-bottom: 20px; }
    .part-card { cursor: pointer; }
    .part-img { height: 160px; background-size: cover; background-position: center; background-color: #1a1a1a; }
    .part-body { padding: 14px; }
    .part-cat { margin-bottom: 8px; display: inline-flex; }
    .part-body h3 { font-size: 0.9rem; font-weight: 700; margin-bottom: 4px; line-height: 1.4; }
    .part-brand { font-size: 0.8rem; color: #6c7a8d; margin-bottom: 8px; }
    .compat-info { margin-bottom: 10px; }
    .part-footer { display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px; }
    .price { font-size: 1.15rem; font-weight: 700; color: #8b5cf6; }
    .store-name { font-size: 0.78rem; color: #6c7a8d; }
    .start-prompt { text-align: center; padding: 80px 20px; color: #6c7a8d; .icon { font-size: 3rem; margin-bottom: 16px; } h3 { font-size: 1.2rem; color: #a8b2c1; margin-bottom: 8px; } }
  `]
})
export class PartsFinderComponent implements OnInit {
  brands: string[] = [];
  models: string[] = [];
  years: number[] = [];
  engines: string[] = [];
  parts: Part[] = [];
  loading = false;
  searched = false;
  total = 0;
  currentPage = 1;
  lastPage = 1;
  fallback = 'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=300';

  sel = { brand: '', model: '', year: '' as any, engine: '' };
  partFilters: PartFilters = { sort: 'rating' };
  partCategories = ['Motor', 'Frenos', 'Suspensión', 'Eléctrico', 'Mantenimiento'];

  get activeVehicle(): string {
    if (!this.sel.brand) return '';
    return [this.sel.brand, this.sel.model, this.sel.year, this.sel.engine].filter(Boolean).join(' ');
  }

  get pages(): number[] {
    return Array.from({ length: this.lastPage }, (_, i) => i + 1);
  }

  constructor(private vehicleSvc: VehicleService, private partsSvc: PartsService) {}

  ngOnInit() {
    this.vehicleSvc.getBrands().subscribe(b => this.brands = b);
  }

  onBrandChange() {
    this.sel.model = ''; this.sel.year = ''; this.sel.engine = '';
    this.models = []; this.years = []; this.engines = [];
    if (this.sel.brand) {
      this.vehicleSvc.getModels(this.sel.brand).subscribe(m => this.models = m);
    }
  }

  onModelChange() {
    this.sel.year = ''; this.sel.engine = '';
    this.years = []; this.engines = [];
    if (this.sel.model) {
      this.vehicleSvc.getYears(this.sel.brand, this.sel.model).subscribe(y => this.years = y);
    }
  }

  onYearChange() {
    this.sel.engine = '';
    this.engines = [];
    if (this.sel.year) {
      this.vehicleSvc.getEngines(this.sel.brand, this.sel.model, this.sel.year).subscribe(e => this.engines = e);
    }
  }

  searchParts() {
    this.loading = true;
    this.searched = true;
    const filters: PartFilters = {
      ...this.partFilters,
      brand: this.sel.brand || undefined,
      model: this.sel.model || undefined,
      year: this.sel.year || undefined,
      engine: this.sel.engine || undefined,
      page: this.currentPage,
    };
    this.partsSvc.getParts(filters).subscribe({
      next: (res) => { this.parts = res.data; this.total = res.total; this.lastPage = res.last_page; this.loading = false; },
      error: () => { this.loading = false; }
    });
  }

  goPage(p: number) {
    if (p < 1 || p > this.lastPage) return;
    this.currentPage = p;
    this.searchParts();
  }

  clearVehicle() {
    this.sel = { brand: '', model: '', year: '', engine: '' };
    this.parts = [];
    this.searched = false;
    this.models = [];
    this.years = [];
    this.engines = [];
  }
}
