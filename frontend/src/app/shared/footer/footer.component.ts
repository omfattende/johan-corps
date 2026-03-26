import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  template: `
    <footer>
      <div class="container">
        <div class="footer-grid">
          <div>
            <div class="brand">🔧 Mecánica<span>Web</span></div>
            <p>La plataforma para encontrar talleres confiables y refacciones compatibles con tu vehículo.</p>
          </div>
          <div>
            <h4>Navegación</h4>
            <a routerLink="/talleres">Talleres mecánicos</a>
            <a routerLink="/refacciones">Buscador de refacciones</a>
            <a routerLink="/auth/login">Iniciar sesión</a>
          </div>
          <div>
            <h4>Talleres por tipo</h4>
            <a routerLink="/talleres" [queryParams]="{category:'Motor'}">Motor</a>
            <a routerLink="/talleres" [queryParams]="{category:'Frenos'}">Frenos</a>
            <a routerLink="/talleres" [queryParams]="{category:'Eléctrico'}">Eléctrico</a>
            <a routerLink="/talleres" [queryParams]="{category:'Suspensión'}">Suspensión</a>
          </div>
        </div>
        <div class="footer-bottom">
          <p>© 2025 MecánicaWeb — Todos los derechos reservados</p>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    footer {
      background: #141414;
      border-top: 1px solid #2a2a2a;
      padding: 48px 0 24px;
      margin-top: 80px;
    }
    .footer-grid {
      display: grid;
      grid-template-columns: 2fr 1fr 1fr;
      gap: 40px;
      padding-bottom: 32px;
      border-bottom: 1px solid #2a2a2a;
      @media (max-width: 700px) { grid-template-columns: 1fr; }
    }
    .brand {
      font-size: 1.2rem;
      font-weight: 800;
      color: #f1faee;
      margin-bottom: 12px;
      span { color: #8b5cf6; }
    }
    p { color: #6c7a8d; font-size: 0.9rem; line-height: 1.6; }
    h4 { color: #a8b2c1; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 16px; }
    a {
      display: block;
      color: #6c7a8d;
      font-size: 0.9rem;
      margin-bottom: 10px;
      transition: color 0.2s;
      &:hover { color: #8b5cf6; }
    }
    .footer-bottom {
      padding-top: 24px;
      text-align: center;
      color: #6c7a8d;
      font-size: 0.85rem;
    }
  `]
})
export class FooterComponent {}
