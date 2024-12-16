import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any = {}; // Dati utente

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.getUserDetails();
  }

  getUserDetails() {
    const token = localStorage.getItem('authToken');
    this.http.get('/api/v1/users/me', { headers: { Authorization: `Bearer ${token}` } })
      .subscribe(
        (response: any) => {
          // Formattazione della data
          if (response.user.createdAt) {
            const date = new Date(response.user.createdAt);
            response.user.formattedCreatedAt = date.toLocaleDateString('it-IT', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            });
          }
          this.user = response.user;
        },
        (error) => {
          console.error('Errore durante il recupero delle informazioni dell\'utente:', error);
        }
      );
  }

  navigateToEdit() {
    this.router.navigate(['/edit-profile']);
  }
}
