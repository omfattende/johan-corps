import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="auth-page">
      <div class="auth-card card">
        <div class="auth-brand">AUTO<span>STOCK</span></div>
        <h1>Iniciar sesión</h1>
        <p class="auth-sub">Accede a tu cuenta para dejar reseñas y más</p>
        <form (ngSubmit)="submit()">
          <div class="form-input-group">
            <label>Correo electrónico</label>
            <input class="form-input" type="email" [(ngModel)]="email" name="email" required placeholder="tu@correo.com">
          </div>
          <div class="form-input-group">
            <label>Contraseña</label>
            <input class="form-input" type="password" [(ngModel)]="password" name="password" required placeholder="••••••••">
          </div>
          <div class="form-error" *ngIf="error">{{ error }}</div>
          <button class="btn btn-primary" type="submit" [disabled]="loading" style="width:100%;justify-content:center;margin-top:8px">
            {{ loading ? 'Entrando...' : 'Iniciar sesión' }}
          </button>
        </form>
        <div class="auth-divider"></div>
        <p class="auth-footer">¿No tienes cuenta? <a routerLink="/auth/registro">Regístrate</a></p>
        <div class="demo-hint">
          <strong>Cuenta de prueba:</strong><br>
          correo: <code>juan&#64;example.com</code><br>
          contraseña: <code>password123</code>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .auth-page { min-height: 80vh; display: flex; align-items: center; justify-content: center; padding: 40px 20px; }
    .auth-card { padding: 40px; max-width: 440px; width: 100%; }
    .auth-brand { font-size: 1.3rem; font-weight: 800; margin-bottom: 24px; span { color: #8b5cf6; } }
    h1 { font-size: 1.6rem; font-weight: 800; margin-bottom: 6px; }
    .auth-sub { color: #6c7a8d; margin-bottom: 28px; }
    .form-input-group { margin-bottom: 16px; }
    .form-error { background: rgba(139,92,246,0.1); border: 1px solid rgba(139,92,246,0.3); color: #8b5cf6; padding: 10px 14px; border-radius: 8px; font-size: 0.88rem; margin-bottom: 12px; }
    .auth-divider { height: 1px; background: #2a2a2a; margin: 20px 0; }
    .auth-footer { text-align: center; color: #a8b2c1; font-size: 0.9rem; a { color: #8b5cf6; } }
    .demo-hint { margin-top: 16px; padding: 14px; background: rgba(255,255,255,0.04); border: 1px solid #333; border-radius: 8px; font-size: 0.82rem; color: #a8b2c1; code { color: #8b5cf6; background: rgba(139,92,246,0.1); padding: 2px 5px; border-radius: 4px; } }
  `]
})
export class LoginComponent {
  email = '';
  password = '';
  loading = false;
  error = '';

  constructor(private auth: AuthService, private router: Router) {}

  submit() {
    if (!this.email || !this.password) return;
    this.loading = true; this.error = '';
    this.auth.login(this.email, this.password).subscribe({
      next: () => this.router.navigate(['/']),
      error: (e) => { this.error = e.error?.message || 'Credenciales incorrectas'; this.loading = false; }
    });
  }
}
