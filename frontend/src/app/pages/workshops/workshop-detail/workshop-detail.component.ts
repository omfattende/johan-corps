import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { WorkshopService } from '../../../core/services/workshop.service';
import { ReviewService } from '../../../core/services/review.service';
import { AuthService } from '../../../core/services/auth.service';
import { Workshop, WorkshopReview } from '../../../core/models/models';

@Component({
  selector: 'app-workshop-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div *ngIf="loading" class="container" style="padding:60px 0"><div class="spinner"></div></div>
    <ng-container *ngIf="!loading && workshop">
      <!-- HEADER -->
      <div class="detail-hero" [style.backgroundImage]="'url('+getImageUrl(workshop)+')'">
        <div class="detail-hero-overlay"></div>
        <div class="container detail-hero-content">
          <a routerLink="/talleres" class="back-link">← Volver a talleres</a>
          <div class="detail-header">
            <div>
              <h1>{{ workshop.name }}</h1>
              <p>📍 {{ workshop.address }}</p>
            </div>
            <div class="rating-big">
              <div class="rating-num">{{ workshop.rating | number:'1.1-1' }}</div>
              <div class="stars">{{ getStars(workshop.rating) }}</div>
              <div class="rating-sub">{{ workshop.review_count }} reseñas</div>
            </div>
          </div>
        </div>
      </div>

      <!-- CONTENT -->
      <div class="container detail-body">
        <div class="detail-grid">
          <!-- MAIN -->
          <div class="detail-main">
            <!-- Services -->
            <div class="detail-section">
              <h2>Servicios ofrecidos</h2>
              <div class="services-grid">
                <div class="service-item" *ngFor="let s of workshop.services">
                  <span class="service-icon">🔧</span>
                  <div>
                    <div class="service-name">{{ s.name }}</div>
                    <div class="service-cat">{{ s.category }}</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Description -->
            <div class="detail-section" *ngIf="workshop.description">
              <h2>Descripción</h2>
              <p class="description">{{ workshop.description }}</p>
            </div>

            <!-- Reviews -->
            <div class="detail-section">
              <h2>Reseñas</h2>

              <!-- Write review -->
              <div class="review-form" *ngIf="auth.isLoggedIn">
                <h4>Deja tu reseña</h4>
                <div class="star-select">
                  <button *ngFor="let n of [1,2,3,4,5]" class="star-btn" [class.active]="newRating >= n" (click)="newRating = n">⭐</button>
                </div>
                <textarea class="form-input" [(ngModel)]="newComment" placeholder="Escribe tu experiencia..." rows="3"></textarea>
                <button class="btn btn-primary btn-sm" (click)="submitReview()" [disabled]="submitting || !newRating">
                  {{ submitting ? 'Enviando...' : 'Publicar reseña' }}
                </button>
                <p class="msg" *ngIf="reviewMsg" [class.error]="reviewError">{{ reviewMsg }}</p>
              </div>
              <div class="login-prompt" *ngIf="!auth.isLoggedIn">
                <a routerLink="/auth/login">Inicia sesión</a> para dejar una reseña
              </div>

              <!-- Review list -->
              <div class="review-list">
                <div class="review-item" *ngFor="let r of reviews">
                  <div class="review-header">
                    <div class="reviewer">
                      <div class="avatar">{{ r.user?.name?.[0] }}</div>
                      <div>
                        <div class="reviewer-name">{{ r.user?.name }}</div>
                        <div class="review-date">{{ r.created_at | date:'dd MMM yyyy' }}</div>
                      </div>
                    </div>
                    <div class="review-stars">{{ getStars(r.rating) }}</div>
                  </div>
                  <p class="review-comment">{{ r.comment }}</p>
                </div>
                <div class="empty-state" *ngIf="!reviews.length">
                  <p>Aún no hay reseñas. ¡Sé el primero!</p>
                </div>
              </div>
            </div>
          </div>

          <!-- SIDEBAR -->
          <aside class="detail-sidebar">
            <div class="info-card">
              <h3>Información de contacto</h3>
              <div class="info-item" *ngIf="workshop.phone">
                <span class="info-icon">📞</span>
                <a [href]="'tel:'+workshop.phone">{{ workshop.phone }}</a>
              </div>
              <div class="info-item" *ngIf="workshop.whatsapp">
                <span class="info-icon">💬</span>
                <a [href]="'https://wa.me/52'+workshop.whatsapp" target="_blank">WhatsApp</a>
              </div>
              <div class="info-item" *ngIf="workshop.schedule">
                <span class="info-icon">🕐</span>
                <span>{{ workshop.schedule }}</span>
              </div>
              <div class="info-item" *ngIf="workshop.city">
                <span class="info-icon">📍</span>
                <span>{{ workshop.city }}</span>
              </div>
              <a *ngIf="workshop.whatsapp" [href]="'https://wa.me/52'+workshop.whatsapp" target="_blank" class="btn btn-primary" style="width:100%;margin-top:16px;justify-content:center">
                💬 Contactar por WhatsApp
              </a>
              <a *ngIf="workshop.latitude && workshop.longitude"
                [href]="'https://www.google.com/maps?q='+workshop.latitude+','+workshop.longitude"
                target="_blank" class="btn btn-ghost" style="width:100%;margin-top:8px;justify-content:center">
                🗺️ Ver en Google Maps
              </a>
            </div>
          </aside>
        </div>
      </div>
    </ng-container>
  `,
  styles: [`
    .detail-hero {
      height: 320px;
      background-size: cover;
      background-position: center;
      position: relative;
      display: flex;
      align-items: flex-end;
    }
    .detail-hero-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 100%); }
    .detail-hero-content { position: relative; z-index: 1; padding-bottom: 32px; width: 100%; }
    .back-link { color: #a8b2c1; font-size: 0.9rem; margin-bottom: 16px; display: inline-block; &:hover { color: #8b5cf6; } }
    .detail-header { display: flex; justify-content: space-between; align-items: flex-end; flex-wrap: wrap; gap: 16px; }
    .detail-header h1 { font-size: 1.8rem; font-weight: 800; }
    .detail-header p { color: #a8b2c1; margin-top: 4px; }
    .rating-big { text-align: center; }
    .rating-num { font-size: 2.5rem; font-weight: 800; color: #f59e0b; }
    .stars { font-size: 1.2rem; }
    .rating-sub { font-size: 0.8rem; color: #a8b2c1; margin-top: 4px; }
    .detail-body { padding: 40px 20px; }
    .detail-grid { display: grid; grid-template-columns: 1fr 300px; gap: 32px; @media(max-width:900px){ grid-template-columns: 1fr; } }
    .detail-section { margin-bottom: 36px; h2 { font-size: 1.1rem; font-weight: 700; margin-bottom: 16px; padding-bottom: 8px; border-bottom: 1px solid #333; } }
    .services-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; }
    .service-item { display: flex; align-items: center; gap: 12px; padding: 12px; background: rgba(255,255,255,0.04); border-radius: 10px; border: 1px solid #333; }
    .service-icon { font-size: 1.2rem; }
    .service-name { font-size: 0.9rem; font-weight: 600; }
    .service-cat { font-size: 0.78rem; color: #6c7a8d; margin-top: 2px; }
    .description { color: #a8b2c1; line-height: 1.8; }
    .review-form { background: rgba(255,255,255,0.03); border: 1px solid #333; border-radius: 12px; padding: 20px; margin-bottom: 20px; h4 { margin-bottom: 12px; } }
    .star-select { display: flex; gap: 6px; margin-bottom: 12px; }
    .star-btn { background: none; border: none; font-size: 1.6rem; cursor: pointer; filter: grayscale(1); transition: filter 0.2s; &.active { filter: grayscale(0); } }
    textarea.form-input { resize: vertical; margin-bottom: 12px; }
    .msg { font-size: 0.85rem; margin-top: 8px; color: #2dc653; &.error { color: #8b5cf6; } }
    .login-prompt { font-size: 0.9rem; color: #a8b2c1; margin-bottom: 20px; a { color: #8b5cf6; } }
    .review-item { padding: 16px 0; border-bottom: 1px solid #2a2a2a; }
    .review-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
    .reviewer { display: flex; align-items: center; gap: 12px; }
    .avatar { width: 36px; height: 36px; border-radius: 50%; background: rgba(139,92,246,0.2); color: #8b5cf6; display: flex; align-items: center; justify-content: center; font-weight: 700; }
    .reviewer-name { font-weight: 600; font-size: 0.9rem; }
    .review-date { font-size: 0.78rem; color: #6c7a8d; }
    .review-stars { font-size: 0.9rem; }
    .review-comment { color: #a8b2c1; font-size: 0.9rem; line-height: 1.6; }
    .info-card { background: #252525; border: 1px solid #333; border-radius: 12px; padding: 20px; position: sticky; top: 80px; h3 { font-size: 0.95rem; font-weight: 700; margin-bottom: 16px; } }
    .info-item { display: flex; align-items: center; gap: 12px; margin-bottom: 12px; font-size: 0.9rem; color: #a8b2c1; a { color: #a8b2c1; &:hover { color: #8b5cf6; } } }
    .info-icon { font-size: 1.1rem; }
  `]
})
export class WorkshopDetailComponent implements OnInit {
  workshop: Workshop | null = null;
  reviews: WorkshopReview[] = [];
  loading = true;
  fallback = 'https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?w=400';
  newRating = 0;
  newComment = '';
  submitting = false;
  reviewMsg = '';
  reviewError = false;

  constructor(
    private route: ActivatedRoute,
    private workshopSvc: WorkshopService,
    private reviewSvc: ReviewService,
    public auth: AuthService
  ) {}

  getImageUrl(workshop: Workshop): string {
    if (workshop.logo) return workshop.logo;
    if (workshop.images && workshop.images.length > 0) return workshop.images[0].image;
    return this.fallback;
  }

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.workshopSvc.getWorkshop(id).subscribe({
      next: (w) => { this.workshop = w; this.reviews = w.reviews || []; this.loading = false; },
      error: () => { this.loading = false; }
    });
  }

  getStars(rating: number): string {
    const full = Math.round(rating);
    return '⭐'.repeat(full) + '☆'.repeat(5 - full);
  }

  submitReview() {
    if (!this.workshop || !this.newRating) return;
    this.submitting = true;
    this.reviewSvc.createWorkshopReview(
      this.workshop.id,
      this.newRating,
      this.newComment
    ).subscribe({
      next: (r: WorkshopReview) => {
        this.reviews.unshift(r);
        this.newRating = 0;
        this.newComment = '';
        this.reviewMsg = '¡Reseña publicada!';
        this.reviewError = false;
        this.submitting = false;
        if (this.workshop) this.workshop.review_count++;
      },
      error: (err: any) => {
        this.reviewMsg = err.error?.message || 'Error al publicar la reseña';
        this.reviewError = true;
        this.submitting = false;
      }
    });
  }
}
