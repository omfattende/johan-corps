import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="auth-page">
      <div class="auth-card card">
        <div class="auth-brand">AUTO<span>STOCK</span></div>
        <h1>Crear cuenta</h1>
        <p class="auth-sub">Únete para dejar reseñas y acceder a más funciones</p>
        <form (ngSubmit)="submit()">
          <div class="form-input-group">
            <label>Nombre completo</label>
            <input class="form-input" type="text" [(ngModel)]="name" name="name" required placeholder="Tu nombre">
          </div>
          <div class="form-input-group">
            <label>Correo electrónico</label>
            <input class="form-input" type="email" [(ngModel)]="email" name="email" required placeholder="tu@correo.com">
          </div>
          <div class="form-input-group">
            <label>Contraseña</label>
            <input class="form-input" type="password" [(ngModel)]="password" name="password" required placeholder="Mínimo 8 caracteres">
          </div>
          <div class="form-input-group">
            <label>Confirmar contraseña</label>
            <input class="form-input" type="password" [(ngModel)]="passwordConfirm" name="passwordConfirm" required placeholder="Repite tu contraseña">
          </div>
          <div class="form-error" *ngIf="error">{{ error }}</div>
          <button class="btn btn-primary" type="submit" [disabled]="loading" style="width:100%;justify-content:center;margin-top:8px">
            {{ loading ? 'Creando cuenta...' : 'Crear cuenta' }}
          </button>
        </form>
        <div class="auth-divider"></div>
        <p class="auth-footer">¿Ya tienes cuenta? <a routerLink="/auth/login">Inicia sesión</a></p>
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
  `]
})
export class RegisterComponent {
  name = '';
  email = '';
  password = '';
  passwordConfirm = '';
  loading = false;
  error = '';

  constructor(private auth: AuthService, private router: Router) {}

  submit() {
    if (this.password !== this.passwordConfirm) {
      this.error = 'Las contraseñas no coinciden'; return;
    }
    this.loading = true; this.error = '';
    this.auth.register({ name: this.name, email: this.email, password: this.password, password_confirmation: this.passwordConfirm }).subscribe({
      next: () => this.router.navigate(['/']),
      error: (e) => {
        const errs = e.error?.errors;
        this.error = errs ? Object.values(errs).flat().join('. ') : 'Error al crear la cuenta';
        this.loading = false;
      }
    });
  }
}
