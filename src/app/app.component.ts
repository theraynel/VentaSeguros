import { Component } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { AuthService } from './seguro/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'ventaSeguroApp';

  constructor(
    private primengConfig: PrimeNGConfig,
    private authService: AuthService,

    ) {}

  ngOnInit() {
    this.primengConfig.ripple = true;
    this.isLoggedIn();
  }


  isLoggedIn(): boolean {
    return this.authService.isLoggedIn(); // Método en tu servicio de autenticación para verificar si el usuario está autenticado
  }


}
