import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { PartsService } from '../../../core/services/parts.service';
import { Part } from '../../../core/models/models';

@Component({
  selector: 'app-part-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div *ngIf="loading" class="container" style="padding:60px 0"><div class="spinner"></div></div>
    <ng-container *ngIf="!loading && part">
      <div class="page-header">
        <div class="container">
          <a routerLink="/refacciones" class="back-link">← Volver a refacciones</a>
          <span class="badge badge-primary">{{ part.category }}</span>
          <h1>{{ part.name }}</h1>
        </div>
      </div>
      <div class="container detail-body">
        <div class="detail-grid">
          <div class="detail-main">
            <div class="part-img-big" [style.backgroundImage]="'url('+(part.image||fallback)+')'"></div>
            <div class="detail-section">
              <h2>Descripción</h2>
              <p class="description">{{ part.description || 'Refacción de alta calidad.' }}</p>
            </div>
            <div class="detail-section">
              <h2>Compatibilidad</h2>
              <div class="compat-list">
                <div class="compat-item" *ngFor="let v of part.vehicles">
                  <span class="compat-icon">✅</span>
                  <span>{{ v.brand }} {{ v.model }} {{ v.year }} — {{ v.engine }}</span>
                </div>
              </div>
            </div>
          </div>
          <aside class="detail-sidebar">
            <div class="info-card">
              <div class="price-big">\${{ part.price | number }}</div>
              <div class="part-meta">
                <div class="meta-row"><span>Marca</span><strong>{{ part.brand }}</strong></div>
                <div class="meta-row"><span>Calificación</span><strong>⭐ {{ part.rating | number:'1.1-1' }}</strong></div>
                <div class="meta-row"><span>Stock</span><strong [class.low]="part.stock < 5">{{ part.stock }} piezas</strong></div>
              </div>
              <div class="store-info">
                <h4>Vendedor</h4>
                <div class="meta-row"><span>Tienda</span><strong>{{ part.store?.name || 'N/A' }}</strong></div>
                <div class="meta-row" *ngIf="part.store?.phone"><span>Contacto</span><strong>{{ part.store?.phone }}</strong></div>
                <div class="meta-row" *ngIf="part.store?.address"><span>Dirección</span><strong>{{ part.store?.address }}</strong></div>
              </div>
              <a *ngIf="part.store?.phone" [href]="'tel:'+part.store?.phone" class="btn btn-primary" style="width:100%;justify-content:center;margin-top:16px">📞 Consultar disponibilidad</a>
            </div>
            <div class="alt-section" *ngIf="alternatives.length">
              <h4>Alternativas</h4>
              <div class="card alt-card" *ngFor="let a of alternatives" [routerLink]="['/refacciones', a.id]">
                <div class="alt-img" [style.backgroundImage]="'url('+(a.image||fallback)+')'"></div>
                <div class="alt-body">
                  <p class="alt-name">{{ a.name }}</p>
                  <div class="alt-foot">
                    <span class="alt-price">\${{ a.price | number }}</span>
                    <span class="alt-brand">{{ a.brand }}</span>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </ng-container>
  `,
  styles: [`
    .page-header { background: linear-gradient(135deg, #0f1014 0%, #0a1520 100%); padding: 40px 0 32px; border-bottom: 1px solid #1a2535; }
    .back-link { display: inline-block; color: #a8b2c1; margin-bottom: 12px; font-size: 0.9rem; &:hover { color: #8b5cf6; } }
    .page-header h1 { font-size: 1.8rem; font-weight: 800; margin-top: 10px; }
    .detail-body { padding: 40px 20px; }
    .detail-grid { display: grid; grid-template-columns: 1fr 300px; gap: 32px; @media(max-width:900px){ grid-template-columns: 1fr; } }
    .part-img-big { height: 280px; background-size: cover; background-position: center; background-color: #1a1a1a; border-radius: 12px; margin-bottom: 24px; }
    .detail-section { margin-bottom: 28px; h2 { font-size: 1rem; font-weight: 700; margin-bottom: 14px; padding-bottom: 8px; border-bottom: 1px solid #333; } }
    .description { color: #a8b2c1; line-height: 1.7; }
    .compat-list { display: flex; flex-direction: column; gap: 8px; }
    .compat-item { display: flex; gap: 10px; padding: 10px 14px; background: rgba(45,198,83,0.06); border: 1px solid rgba(45,198,83,0.2); border-radius: 8px; font-size: 0.9rem; }
    .info-card { background: #252525; border: 1px solid #333; border-radius: 12px; padding: 20px; position: sticky; top: 80px; }
    .price-big { font-size: 2rem; font-weight: 800; color: #8b5cf6; margin-bottom: 16px; }
    .part-meta, .store-info { margin-bottom: 16px; }
    .meta-row { display: flex; justify-content: space-between; align-items: center; padding: 8px 0; border-bottom: 1px solid #2a2a2a; font-size: 0.85rem; span { color: #6c7a8d; } strong { color: #f1faee; &.low { color: #f59e0b; } } }
    .store-info h4 { font-size: 0.85rem; text-transform: uppercase; letter-spacing: 1px; color: #a8b2c1; margin: 12px 0 8px; }
    .alt-section { margin-top: 20px; h4 { font-size: 0.85rem; text-transform: uppercase; letter-spacing: 1px; color: #a8b2c1; margin-bottom: 12px; } }
    .alt-card { display: flex; cursor: pointer; gap: 12px; padding: 10px; margin-bottom: 8px; align-items: center; }
    .alt-img { width: 56px; height: 56px; flex-shrink: 0; background-size: cover; background-position: center; background-color: #1a1a1a; border-radius: 8px; }
    .alt-name { font-size: 0.82rem; font-weight: 600; margin-bottom: 4px; }
    .alt-foot { display: flex; justify-content: space-between; font-size: 0.78rem; }
    .alt-price { color: #8b5cf6; font-weight: 700; }
    .alt-brand { color: #6c7a8d; }
  `]
})
export class PartDetailComponent implements OnInit {
  part: Part | null = null;
  alternatives: Part[] = [];
  loading = true;
  fallback = 'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=300';

  constructor(private route: ActivatedRoute, private partsSvc: PartsService) { }

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.partsSvc.getPart(id).subscribe({
      next: (p) => { this.part = p; this.loading = false; this.loadAlternatives(id); },
      error: () => { this.loading = false; }
    });
  }

  loadAlternatives(id: number) {
    this.partsSvc.getAlternatives(id).subscribe(a => this.alternatives = a);
  }
}
