// src/app/shared/components/navbar/navbar.component.ts
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, MatToolbarModule, MatButtonModule, MatIconModule, MatMenuModule],
  template: `
    <mat-toolbar color="primary" class="mat-elevation-z6">
      <div class="container">
        <a routerLink="/" class="navbar-brand">
          <img src="assets/images/logo-adres.png" alt="ADRES Logo" height="40">
          <span>Sistema de Gestión de Adquisiciones</span>
        </a>
        <div class="spacer"></div>
        <!-- En tu navbar.component.html -->
        <button mat-button routerLink="/adquisiciones/dashboard">
          <mat-icon>dashboard</mat-icon> Dashboard
        </button>
        <button mat-button routerLink="/adquisiciones">
          <mat-icon>list</mat-icon> Adquisiciones
        </button>
        <button mat-button routerLink="/adquisiciones/nuevo">
          <mat-icon>add</mat-icon> Nueva Adquisición
        </button>
      </div>
    </mat-toolbar>
  `,
  styles: [`
    .container {
      display: flex;
      width: 100%;
      align-items: center;
    }

    .navbar-brand {
      display: flex;
      align-items: center;
      text-decoration: none;
      color: white;
      
      img {
        margin-right: 10px;
      }
    }

    .spacer {
      flex: 1 1 auto;
    }
  `]
})
export class NavbarComponent {}