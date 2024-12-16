import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any = null; // Qui memorizzeremo i dati dell'utente
  error: string | null = null;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    this.userService.getUser().subscribe({
      next: (response) => {
        this.user = response.user;
      },
      error: (err) => {
        console.error('Errore nel caricamento del profilo:', err);
        this.error = 'Non è stato possibile caricare il profilo utente.';
      }
    });
  }
}
