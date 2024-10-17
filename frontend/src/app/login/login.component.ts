import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';  // Importa il servizio di autenticazione

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';  // Dati per l'input email
  password: string = '';  // Dati per l'input password
  errorMessage: string = '';  // Variabile per gestire eventuali messaggi di errore


  constructor(private authService: AuthService) {}

  onSubmit(): void {
    this.authService.login(this.email, this.password).subscribe(
      (response) => {
        console.log('Login successful:', response);

        localStorage.setItem('token', response.token);
        // Qui puoi salvare il token JWT o fare un redirect
      },
      (error) => {
        console.error('Login failed:', error);
        this.errorMessage = 'Login failed. Please check your credentials.';  // Mostra un messaggio d'errore
        // Gestione errori, come visualizzare un messaggio all'utente
      }
    );
  }
}
