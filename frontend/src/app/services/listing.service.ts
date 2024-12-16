import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListingService {
  private apiUrl = 'http://localhost:3001/api/v1/listings'; // Modifica l'URL se necessario

  constructor(private http: HttpClient) {}

  // Ottieni tutti i listings
  getListings(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
