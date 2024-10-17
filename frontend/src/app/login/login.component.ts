import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';  // Importa il servizio di autenticazione
import { Router } from '@angular/router';  // Importa il Router di Angular

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';  // Dati per l'input email
  password: string = '';  // Dati per l'input password
  errorMessage: string = '';  // Variabile per gestire eventuali messaggi di errore

  constructor(private authService: AuthService, private router: Router) {}  // Aggiungi il Router al costruttore

  onSubmit(): void {
    this.authService.login(this.email, this.password).subscribe(
      (response) => {
        console.log('Login successful:', response);

        // Salva il token JWT nel localStorage o fai altre operazioni
        localStorage.setItem('token', response.token);

        // Reindirizza l'utente alla pagina home
        this.router.navigate(['/home']);  // Indica il percorso della tua pagina home
      },
      (error) => {
        console.error('Login failed:', error);
        this.errorMessage = 'Login failed. Please check your credentials.';  // Mostra un messaggio d'errore
      }
    );
  }
}
