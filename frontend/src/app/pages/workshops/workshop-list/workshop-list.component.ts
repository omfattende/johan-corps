import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { WorkshopService } from '../../../core/services/workshop.service';
import { WorkshopFilters } from '../../../core/models/models';
import { Workshop } from '../../../core/models/models';

@Component({
  selector: 'app-workshop-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="page-header">
      <div class="container">
        <h1>Talleres <span>mecánicos</span></h1>
        <p>Encuentra el mejor taller para tu vehículo</p>
        <div class="search-row">
          <input class="form-input" type="text" [(ngModel)]="filters.search" placeholder="Buscar por nombre o servicio..." (keyup.enter)="load()">
          <button class="btn btn-primary" (click)="load()">🔍 Buscar</button>
        </div>
      </div>
    </div>

    <div class="container page-body">
      <div class="layout">
        <!-- SIDEBAR FILTERS -->
        <aside class="sidebar">
          <h3>Filtros</h3>
          <div class="filter-group">
            <label>Tipo de servicio</label>
            <select class="form-input" [(ngModel)]="filters.service_category" (change)="load()">
              <option value="">Todos</option>
              <option *ngFor="let c of categories" [value]="c">{{ c }}</option>
            </select>
          </div>
          <div class="filter-group">
            <label>Calificación mínima</label>
            <div class="rating-filters">
              <button *ngFor="let r of [5,4,3,2]" class="rating-btn" [class.active]="filters.min_rating === r" (click)="setRating(r)">
                {{ '⭐'.repeat(r) }} {{ r }}+
              </button>
            </div>
          </div>
          <div class="filter-group">
            <label>Ubicación</label>
            <button class="btn btn-ghost btn-sm" (click)="useLocation()" style="width:100%">📍 Usar mi ubicación</button>
            <p class="loc-status" *ngIf="locationStatus">{{ locationStatus }}</p>
          </div>
          <button class="btn btn-outline btn-sm" (click)="clearFilters()" style="width:100%;margin-top:8px">Limpiar filtros</button>
        </aside>

        <!-- RESULTS -->
        <div class="results">
          <div class="results-header">
            <span class="result-count" *ngIf="!loading">{{ total }} talleres encontrados</span>
            <span *ngIf="loading">Buscando...</span>
          </div>
          <div class="spinner" *ngIf="loading"></div>
          <div class="grid-3" *ngIf="!loading && workshops.length">
            <div class="card workshop-card fade-in-up" *ngFor="let w of workshops" [routerLink]="['/talleres', w.id]">
              <div class="card-img" [style.backgroundImage]="'url('+(getImageUrl(w))+')'">
                <div class="card-overlay"></div>
                <div class="card-rating">⭐ {{ w.rating | number:'1.1-1' }}</div>
                <div class="card-dist" *ngIf="w.distance">📍 {{ w.distance | number:'1.1-1' }} km</div>
              </div>
              <div class="card-body">
                <h3>{{ w.name }}</h3>
                <p class="card-address">{{ w.address }}</p>
                <div class="service-tags">
                  <span class="badge badge-primary" *ngFor="let s of (w.services||[]).slice(0,3)">{{ s.name }}</span>
                </div>
                <div class="card-footer">
                  <span class="reviews">{{ w.review_count }} reseñas</span>
                  <button class="btn btn-primary btn-sm">Ver perfil</button>
                </div>
              </div>
            </div>
          </div>
          <div class="empty-state" *ngIf="!loading && !workshops.length">
            <div class="icon">🔧</div>
            <h3>No encontramos talleres</h3>
            <p>Intenta quitar algunos filtros</p>
          </div>
          <div class="pagination" *ngIf="lastPage > 1">
            <button (click)="goPage(currentPage-1)" [disabled]="currentPage===1">←</button>
            <button *ngFor="let p of pages" (click)="goPage(p)" [class.active]="p===currentPage">{{ p }}</button>
            <button (click)="goPage(currentPage+1)" [disabled]="currentPage===lastPage">→</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .page-header {
      background: linear-gradient(135deg, #141414 0%, #1a0505 100%);
      padding: 48px 0 32px;
      border-bottom: 1px solid #2a2a2a;
      h1 { font-size: 2rem; font-weight: 800; margin-bottom: 6px; span { color: #8b5cf6; } }
      p { color: #a8b2c1; margin-bottom: 20px; }
    }
    .search-row { display: flex; gap: 12px; max-width: 600px; }
    .search-row input { flex: 1; }
    .page-body { padding: 40px 20px; }
    .layout { display: grid; grid-template-columns: 260px 1fr; gap: 32px; align-items: start; @media(max-width:800px){ grid-template-columns: 1fr; } }
    .sidebar {
      background: #252525;
      border: 1px solid #333;
      border-radius: 12px;
      padding: 20px;
      position: sticky;
      top: 80px;
      h3 { font-size: 1rem; font-weight: 700; margin-bottom: 20px; }
    }
    .filter-group { margin-bottom: 20px; label { display: block; font-size: 0.82rem; font-weight: 600; color: #a8b2c1; margin-bottom: 8px; } }
    .rating-filters { display: flex; flex-direction: column; gap: 6px; }
    .rating-btn {
      padding: 7px 12px; border: 1px solid #333; background: transparent;
      color: #a8b2c1; border-radius: 8px; cursor: pointer; text-align: left;
      font-family: 'Inter', sans-serif; font-size: 0.82rem; transition: all 0.2s;
      &:hover, &.active { background: rgba(139,92,246,0.1); border-color: #8b5cf6; color: #8b5cf6; }
    }
    .loc-status { font-size: 0.78rem; color: #6c7a8d; margin-top: 6px; }
    .results-header { margin-bottom: 20px; color: #a8b2c1; font-size: 0.9rem; }
    .card-img { height: 190px; background-size: cover; background-position: center; position: relative; }
    .card-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.6), transparent); }
    .card-rating { position: absolute; top: 10px; right: 10px; background: rgba(0,0,0,0.7); padding: 3px 8px; border-radius: 20px; font-size: 0.82rem; font-weight: 700; }
    .card-dist { position: absolute; bottom: 10px; left: 10px; background: rgba(0,0,0,0.7); padding: 3px 8px; border-radius: 20px; font-size: 0.78rem; }
    .card-body { padding: 14px; }
    .card-body h3 { font-size: 1rem; font-weight: 700; margin-bottom: 4px; }
    .card-address { font-size: 0.82rem; color: #6c7a8d; margin-bottom: 10px; }
    .service-tags { display: flex; flex-wrap: wrap; gap: 5px; margin-bottom: 14px; }
    .card-footer { display: flex; align-items: center; justify-content: space-between; }
    .reviews { font-size: 0.78rem; color: #6c7a8d; }
    .workshop-card { cursor: pointer; }
  `]
})
export class WorkshopListComponent implements OnInit {
  workshops: Workshop[] = [];
  loading = false;
  total = 0;
  currentPage = 1;
  lastPage = 1;
  locationStatus = '';
  fallback = 'https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?w=400';

  filters: WorkshopFilters = {};
  categories = ['Motor', 'Frenos', 'Eléctrico', 'Transmisión', 'Suspensión', 'Hojalatería', 'Mantenimiento', 'Diagnóstico'];

  constructor(private svc: WorkshopService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe(q => {
      if (q['search']) this.filters.search = q['search'];
      if (q['category']) this.filters.service_category = q['category'];
      this.load();
    });
  }

  get pages(): number[] {
    return Array.from({ length: this.lastPage }, (_, i) => i + 1);
  }

  load() {
    this.loading = true;
    this.svc.getWorkshops({ ...this.filters, page: this.currentPage }).subscribe({
      next: (res) => { this.workshops = res.data; this.total = res.total; this.lastPage = res.last_page; this.loading = false; },
      error: () => { this.loading = false; }
    });
  }

  goPage(p: number) {
    if (p < 1 || p > this.lastPage) return;
    this.currentPage = p;
    this.load();
  }

  setRating(r: number) {
    this.filters.min_rating = this.filters.min_rating === r ? undefined : r;
    this.currentPage = 1;
    this.load();
  }

  useLocation() {
    this.locationStatus = 'Obteniendo ubicación...';
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        this.filters.lat = pos.coords.latitude;
        this.filters.lng = pos.coords.longitude;
        this.locationStatus = '✓ Ordenando por cercanía';
        this.load();
      },
      () => { this.locationStatus = '✗ No se pudo obtener la ubicación'; }
    );
  }

  clearFilters() {
    this.filters = {};
    this.currentPage = 1;
    this.locationStatus = '';
    this.load();
  }

  getImageUrl(workshop: Workshop): string {
    // Primero intentar con el logo, luego con la primera imagen, o el fallback
    if (workshop.logo) return workshop.logo;
    if (workshop.images && workshop.images.length > 0) return workshop.images[0].image;
    return this.fallback;
  }
}
