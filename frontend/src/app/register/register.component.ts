import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';  // Servizio per gestire le API
import { Router } from '@angular/router';  // Per reindirizzare alla pagina di login

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  name: string = '';  // Nome dell'utente
  surname: string = '';  // Cognome dell'utente
  username: string = '';  // Username dell'utente
  email: string = '';  // Email dell'utente
  password: string = '';  // Password dell'utente
  confirmPassword: string = '';  // Conferma della password
  errorMessage: string = '';  // Messaggio di errore


  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match!';
      return;
    }
  
    this.authService.register(this.name, this.surname, this.email, this.password).subscribe(
      (response) => {
        console.log('Registration successful:', response);
        // Redirect or show a success message
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Registration failed:', error);
        this.errorMessage = 'Registration failed. Please check your details.';
      }
    );
  }
}
