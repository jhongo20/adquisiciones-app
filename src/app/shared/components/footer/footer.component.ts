// src/app/shared/components/footer/footer.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer class="footer">
      <div class="container">
        <p>© {{currentYear}} ADRES - Sistema de Gestión de Adquisiciones</p>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      background-color: #1a2d5a;
      color: white;
      padding: 15px 0;
      margin-top: 50px;
      text-align: center;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 15px;
    }
  `]
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
}