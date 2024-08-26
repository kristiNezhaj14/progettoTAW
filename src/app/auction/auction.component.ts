import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auction',
  templateUrl: './auction.component.html',
  styleUrls: ['./auction.component.css']
})
export class AuctionComponent implements OnInit {

  book: any;  // Assicurati che questa proprietà sia dichiarata

  constructor() { }

  ngOnInit(): void {
    this.book = {
      id: '1',
      title: 'Esempio di Libro',
      author: 'Autore Esempio',
      description: 'Questo è un esempio di descrizione del libro. Include informazioni rilevanti come il contenuto, l\'autore e altre caratteristiche.',
      image: 'assets/copertine/ilcacciatore.jpg',
      rating: 4.5,
      price: 20.00,
      timeRemaining: '2h 15m',
      currentBid: 22.50,
      currentBidder: 'User123'
    };
  }
}
