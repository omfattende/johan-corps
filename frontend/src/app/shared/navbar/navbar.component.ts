import { Component, HostListener } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  template: `
    <nav class="navbar" [class.scrolled]="scrolled">
      <div class="nav-container">
        <a routerLink="/" class="brand">
          <span class="brand-icon">AS</span>
          <span class="brand-text">AUTO<span class="accent">STOCK</span></span>
        </a>
        <ul class="nav-links">
          <li><a routerLink="/talleres" routerLinkActive="active">Talleres</a></li>
          <li><a routerLink="/refacciones" routerLinkActive="active">Refacciones</a></li>
        </ul>
        <div class="nav-actions">
          <ng-container *ngIf="auth.isLoggedIn; else guestLinks">
            <span class="user-name">{{ auth.currentUser?.name }}</span>
            <button class="btn btn-ghost btn-sm" (click)="auth.logout()">Salir</button>
          </ng-container>
          <ng-template #guestLinks>
            <a routerLink="/auth/login" class="btn btn-ghost btn-sm">Iniciar sesión</a>
            <a routerLink="/auth/registro" class="btn btn-primary btn-sm">Registrarse</a>
          </ng-template>
        </div>
        <button class="menu-toggle" (click)="menuOpen = !menuOpen">Menu</button>
      </div>
      <div class="mobile-menu" [class.open]="menuOpen">
        <a routerLink="/talleres" (click)="menuOpen=false">Talleres</a>
        <a routerLink="/refacciones" (click)="menuOpen=false">Refacciones</a>
        <a routerLink="/auth/login" (click)="menuOpen=false">Iniciar sesión</a>
        <a routerLink="/auth/registro" (click)="menuOpen=false">Registrarse</a>
      </div>
    </nav>
  `,
  styles: [`
    .navbar {
      position: sticky;
      top: 0;
      z-index: 1000;
      background: rgba(29, 29, 29, 0.85);
      backdrop-filter: blur(12px);
      border-bottom: 1px solid transparent;
      transition: all 0.3s ease;
    }
    .navbar.scrolled {
      border-bottom-color: rgba(255,255,255,0.08);
      background: rgba(29,29,29,0.97);
    }
    .nav-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
      height: 64px;
      display: flex;
      align-items: center;
      gap: 32px;
    }
    .brand {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 1.3rem;
      font-weight: 800;
      color: #f1faee;
    }
    .brand-icon { font-size: 1.5rem; }
    .accent { color: #8b5cf6; }
    .nav-links {
      display: flex;
      gap: 32px;
      list-style: none;
      flex: 1;
      a {
        color: #a8b2c1;
        font-weight: 500;
        font-size: 0.95rem;
        transition: color 0.2s;
        position: relative;
        padding-bottom: 4px;
        &:hover, &.active { color: #f1faee; }
        &.active::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0; right: 0;
          height: 2px;
          background: #8b5cf6;
          border-radius: 2px;
        }
      }
    }
    .nav-actions {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-left: auto;
    }
    .user-name {
      color: #a8b2c1;
      font-size: 0.9rem;
    }
    .menu-toggle {
      display: none;
      background: none;
      border: none;
      color: #f1faee;
      font-size: 1.4rem;
      cursor: pointer;
      margin-left: auto;
    }
    .mobile-menu {
      display: none;
      flex-direction: column;
      gap: 0;
      background: #1d1d1d;
      border-top: 1px solid #333;
      &.open { display: flex; }
      a {
        padding: 14px 20px;
        color: #a8b2c1;
        border-bottom: 1px solid #333;
        &:hover { background: rgba(255,255,255,0.05); color: #f1faee; }
      }
    }
    @media (max-width: 768px) {
      .nav-links, .nav-actions { display: none; }
      .menu-toggle { display: block; }
    }
  `]
})
export class NavbarComponent {
  scrolled = false;
  menuOpen = false;
  constructor(public auth: AuthService) {}

  @HostListener('window:scroll')
  onScroll() {
    this.scrolled = window.scrollY > 20;
  }
}
