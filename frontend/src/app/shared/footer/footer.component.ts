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
            <div class="brand">🔧 INN<span>TECH</span></div>
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
        
        <div class="team-section">
          <h4>Equipo de Desarrollo</h4>
          <div class="team-grid">
            <div class="team-member">
              <span class="member-id">2209358</span>
              <span class="member-name">Antonio Buenaventura Israel</span>
            </div>
            <div class="team-member">
              <span class="member-id">2210909</span>
              <span class="member-name">Lugo Torres Kimey Yeray</span>
            </div>
            <div class="team-member">
              <span class="member-id">2210276</span>
              <span class="member-name">Mendoza Mireles Abel Emiliano</span>
            </div>
            <div class="team-member">
              <span class="member-id">2210766</span>
              <span class="member-name">Morantes Acosta Carlos Aaron</span>
            </div>
            <div class="team-member">
              <span class="member-id">2209730</span>
              <span class="member-name">Rodriguez García Tadeo Zadkiel</span>
            </div>
            <div class="team-member">
              <span class="member-id">2210195</span>
              <span class="member-name">Sánchez Carreón Johan Daniel</span>
            </div>
            <div class="team-member">
              <span class="member-id">2210314</span>
              <span class="member-name">Vidal Martinez Arleth Fernanda</span>
            </div>
          </div>
        </div>
        
        <div class="footer-bottom">
          <p>© 2025 INNTECH — Todos los derechos reservados</p>
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
    
    .team-section {
      padding: 32px 0;
      border-bottom: 1px solid #2a2a2a;
      h4 {
        text-align: center;
        margin-bottom: 24px;
        color: #8b5cf6;
      }
    }
    .team-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 12px;
    }
    .team-member {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 10px 16px;
      background: rgba(139, 92, 246, 0.1);
      border-radius: 8px;
      border: 1px solid rgba(139, 92, 246, 0.2);
    }
    .member-id {
      font-size: 0.75rem;
      color: #8b5cf6;
      font-weight: 600;
      min-width: 60px;
    }
    .member-name {
      font-size: 0.85rem;
      color: #a8b2c1;
    }
    
    .footer-bottom {
      padding-top: 24px;
      text-align: center;
      color: #6c7a8d;
      font-size: 0.85rem;
    }
    
    @media (max-width: 600px) {
      .team-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class FooterComponent {}
