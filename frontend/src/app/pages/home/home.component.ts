import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { WorkshopService } from '../../core/services/workshop.service';
import { Workshop } from '../../core/models/models';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  template: `
    <!-- HERO -->
    <section class="hero">
      <div class="hero-bg"></div>
      <div class="container hero-content">
        <span class="hero-badge">🇲🇽 Plataforma automotriz mexicana</span>
        <h1>Encuentra el taller y las refacciones que necesitas</h1>
        <p>Talleres mecánicos verificados, refacciones compatibles con tu vehículo y reseñas reales de usuarios.</p>
        <div class="search-bar">
          <input type="text" [(ngModel)]="searchQuery" placeholder="Buscar por taller, servicio o ciudad..." (keyup.enter)="searchWorkshops()">
          <button class="btn btn-primary" (click)="searchWorkshops()">🔍 Buscar</button>
        </div>
        <div class="quick-filters">
          <button *ngFor="let cat of categories" class="chip" (click)="goToCategory(cat.value)">{{ cat.label }}</button>
        </div>
      </div>
    </section>

    <!-- FEATURED WORKSHOPS -->
    <section class="section">
      <div class="container">
        <div class="section-header">
          <div>
            <h2 class="section-title">Talleres <span>destacados</span></h2>
            <p class="section-sub">Los mejor calificados por nuestra comunidad</p>
          </div>
          <a routerLink="/talleres" class="btn btn-outline">Ver todos →</a>
        </div>
        <div class="grid-3" *ngIf="!loading">
          <div class="card workshop-card fade-in-up" *ngFor="let w of featuredWorkshops" [routerLink]="['/talleres', w.id]">
            <div class="card-img" [style.backgroundImage]="'url('+getImageUrl(w)+')'">
              <div class="card-overlay"></div>
              <div class="card-rating">⭐ {{ w.rating | number:'1.1-1' }}</div>
            </div>
            <div class="card-body">
              <h3>{{ w.name }}</h3>
              <p class="card-address">📍 {{ w.address }}</p>
              <div class="service-tags">
                <span class="badge badge-primary" *ngFor="let s of (w.services || []).slice(0,3)">{{ s.name }}</span>
              </div>
              <div class="card-footer">
                <span class="reviews">{{ w.review_count }} reseñas</span>
                <button class="btn btn-primary btn-sm">Ver perfil</button>
              </div>
            </div>
          </div>
        </div>
        <div class="spinner" *ngIf="loading"></div>
      </div>
    </section>

    <!-- HOW TO USE PARTS -->
    <section class="section refac-cta">
      <div class="container">
        <div class="refac-grid">
          <div class="refac-text">
            <span class="badge badge-warning">🔩 Nuevo</span>
            <h2 class="section-title" style="margin-top:12px">Encuentra refacciones <span>compatibles</span></h2>
            <p>Selecciona tu vehículo y te mostramos exactamente qué refacciones son compatibles con tu carro. Precios de múltiples tiendas.</p>
            <a routerLink="/refacciones" class="btn btn-primary" style="margin-top:24px">Buscar refacciones →</a>
          </div>
          <div class="refac-steps">
            <div class="step" *ngFor="let step of steps; let i = index">
              <div class="step-num">{{ i + 1 }}</div>
              <div>
                <h4>{{ step.title }}</h4>
                <p>{{ step.desc }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- STATS -->
    <section class="stats-section">
      <div class="container">
        <div class="stats-grid">
          <div class="stat" *ngFor="let s of stats">
            <div class="stat-num">{{ s.num }}</div>
            <div class="stat-label">{{ s.label }}</div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .hero {
      position: relative;
      padding: 100px 0 80px;
      overflow: hidden;
    }
    .hero-bg {
      position: absolute; inset: 0;
      background: linear-gradient(135deg, #0f0f0f 0%, #1a0a0a 50%, #0f1e35 100%);
      z-index: 0;
    }
    .hero-bg::after {
      content: '';
      position: absolute;
      top: -100px; right: -100px;
      width: 600px; height: 600px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%);
    }
    .hero-content {
      position: relative; z-index: 1;
      max-width: 700px;
    }
    .hero-badge {
      display: inline-flex;
      background: rgba(139,92,246,0.1);
      border: 1px solid rgba(139,92,246,0.3);
      color: #8b5cf6;
      padding: 6px 14px;
      border-radius: 20px;
      font-size: 0.85rem;
      font-weight: 600;
      margin-bottom: 20px;
    }
    h1 {
      font-size: clamp(2rem, 5vw, 3.2rem);
      font-weight: 800;
      line-height: 1.15;
      margin-bottom: 16px;
    }
    .hero p {
      color: #a8b2c1;
      font-size: 1.1rem;
      margin-bottom: 32px;
      max-width: 560px;
    }
    .search-bar {
      display: flex;
      gap: 12px;
      max-width: 600px;
      margin-bottom: 20px;
      input {
        flex: 1;
        padding: 14px 18px;
        background: rgba(255,255,255,0.07);
        border: 1px solid rgba(255,255,255,0.15);
        border-radius: 10px;
        color: #f1faee;
        font-size: 0.95rem;
        outline: none;
        font-family: 'Inter', sans-serif;
        &::placeholder { color: #6c7a8d; }
        &:focus { border-color: #8b5cf6; }
      }
    }
    .quick-filters {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
    }
    .chip {
      background: rgba(255,255,255,0.06);
      border: 1px solid rgba(255,255,255,0.12);
      color: #a8b2c1;
      padding: 6px 14px;
      border-radius: 20px;
      font-size: 0.82rem;
      cursor: pointer;
      font-family: 'Inter', sans-serif;
      transition: all 0.2s;
      &:hover { background: rgba(139,92,246,0.15); border-color: rgba(139,92,246,0.4); color: #8b5cf6; }
    }
    .section { padding: 60px 0; }
    .section-header {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      margin-bottom: 32px;
      flex-wrap: wrap;
      gap: 16px;
    }
    .workshop-card {
      cursor: pointer;
    }
    .card-img {
      height: 200px;
      background-size: cover;
      background-position: center;
      position: relative;
    }
    .card-overlay {
      position: absolute; inset: 0;
      background: linear-gradient(to top, rgba(0,0,0,0.6), transparent);
    }
    .card-rating {
      position: absolute;
      top: 12px; right: 12px;
      background: rgba(0,0,0,0.7);
      padding: 4px 10px;
      border-radius: 20px;
      font-size: 0.85rem;
      font-weight: 700;
    }
    .card-body { padding: 16px; }
    .card-body h3 { font-size: 1.05rem; font-weight: 700; margin-bottom: 6px; }
    .card-address { color: #6c7a8d; font-size: 0.85rem; margin-bottom: 12px; }
    .service-tags { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 16px; }
    .card-footer { display: flex; align-items: center; justify-content: space-between; }
    .reviews { color: #6c7a8d; font-size: 0.82rem; }
    .refac-cta {
      background: linear-gradient(135deg, #0f1922 0%, #0d1520 100%);
      border-top: 1px solid #1a2535;
      border-bottom: 1px solid #1a2535;
    }
    .refac-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 60px;
      align-items: center;
      @media(max-width:768px) { grid-template-columns: 1fr; }
    }
    .refac-text p { color: #a8b2c1; margin-top: 12px; }
    .step {
      display: flex;
      align-items: flex-start;
      gap: 16px;
      padding: 20px;
      background: rgba(255,255,255,0.04);
      border-radius: 12px;
      border: 1px solid rgba(255,255,255,0.06);
      margin-bottom: 12px;
    }
    .step-num {
      width: 36px; height: 36px;
      background: rgba(139,92,246,0.15);
      border: 1px solid rgba(139,92,246,0.3);
      color: #8b5cf6;
      border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      font-weight: 700;
      flex-shrink: 0;
    }
    .step h4 { font-size: 0.95rem; font-weight: 600; margin-bottom: 4px; }
    .step p { font-size: 0.85rem; color: #6c7a8d; margin: 0; }
    .stats-section { padding: 48px 0; }
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 20px;
      @media (max-width: 600px) { grid-template-columns: repeat(2, 1fr); }
    }
    .stat {
      text-align: center;
      padding: 28px 20px;
      background: rgba(255,255,255,0.03);
      border: 1px solid #2a2a2a;
      border-radius: 12px;
    }
    .stat-num {
      font-size: 2rem;
      font-weight: 800;
      color: #8b5cf6;
      margin-bottom: 6px;
    }
    .stat-label { color: #6c7a8d; font-size: 0.85rem; }
  `]
})
export class HomeComponent implements OnInit {
  featuredWorkshops: Workshop[] = [];
  loading = true;
  searchQuery = '';
  fallbackImg = 'https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?w=400';

  categories = [
    { label: '⚙️ Motor y afinación', value: 'Motor' },
    { label: '🛑 Frenos', value: 'Frenos' },
    { label: '⚡ Eléctrico', value: 'Eléctrico' },
    { label: '🔩 Suspensión', value: 'Suspensión' },
    { label: '🎨 Hojalatería', value: 'Hojalatería' },
  ];

  steps = [
    { title: 'Selecciona tu vehículo', desc: 'Marca, modelo, año y motor' },
    { title: 'Ve refacciones compatibles', desc: 'Sistema de compatibilidad inteligente' },
    { title: 'Compara precios y tiendas', desc: 'Múltiples proveedores en un lugar' },
  ];

  stats = [
    { num: '6+', label: 'Talleres registrados' },
    { num: '12+', label: 'Refacciones disponibles' },
    { num: '22+', label: 'Vehículos compatibles' },
    { num: '⭐ 4.4', label: 'Calificación promedio' },
  ];

  constructor(private workshopSvc: WorkshopService, private router: Router) {}

  ngOnInit() {
    this.workshopSvc.getWorkshops({ page: 1 }).subscribe({
      next: (res) => { this.featuredWorkshops = res.data.slice(0, 3); this.loading = false; },
      error: () => { this.loading = false; }
    });
  }

  searchWorkshops() {
    this.router.navigate(['/talleres'], { queryParams: { search: this.searchQuery } });
  }

  goToCategory(cat: string) {
    this.router.navigate(['/talleres'], { queryParams: { category: cat } });
  }

  getImageUrl(workshop: Workshop): string {
    if (workshop.logo) return workshop.logo;
    if (workshop.images && workshop.images.length > 0) return workshop.images[0].image;
    return this.fallbackImg;
  }
}
