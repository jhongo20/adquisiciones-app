// src/app/core/services/navigation.service.ts
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  constructor(private router: Router) {}

  navigateTo(path: string[]): void {
    console.log('NavigationService: Navegando a', path);
    
    // Forzar actualización completa si es necesario
    window.location.href = this.router.serializeUrl(
      this.router.createUrlTree(path)
    );
    
    // Alternativa usando la API del router (prueba esto si el método anterior falla)
    // this.router.navigate(path, { skipLocationChange: false, replaceUrl: false });
  }
}