import { Component } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'ventaSeguroApp';

  constructor(private primengConfig: PrimeNGConfig) {}

  ngOnInit() {
    this.primengConfig.ripple = true;
    this.isLoggedIn();
  }


  isLoggedIn(): boolean {
    return false; //this.authService.isLoggedIn(); // Método en tu servicio de autenticación para verificar si el usuario está autenticado
  }
}
