import { Component, OnInit } from '@angular/core';
import { ListingService } from '../services/listing.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  categories = ['Fiction', 'Non-fiction', 'Science Fiction', 'Fantasy', 'Mystery', 'Biography'];
  books: any[] = []; // Sarà popolato dinamicamente
  featuredBooks: any[] = [];

  constructor(private listingService: ListingService) {}

  ngOnInit(): void {
    this.fetchListings();
  }

  // Funzione per recuperare i listings
  fetchListings(): void {
    this.listingService.getListings().subscribe(
      (data) => {
        this.books = data.listings; // Associa i dati ricevuti ai libri
        this.featuredBooks = data.listings.slice(0, 4); // Mostra solo i primi 4 come "Featured"
      },
      (error) => {
        console.error('Errore nel recupero dei listings:', error);
      }
    );
  }
}
