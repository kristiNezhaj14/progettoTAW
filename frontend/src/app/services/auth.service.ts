import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3001/api/v1';  // URL del backend

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    // Codifica le credenziali in base64
    const credentials = btoa(`${email}:${password}`);
    
    // Imposta gli headers, inclusi Authorization
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Basic ${credentials}`
    });

    return this.http.post(`${this.apiUrl}/authenticate`, {}, { headers });
  }

  register(name: string, surname: string, email: string, password: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.apiUrl}/users/register`, { name, surname, email, password }, { headers });
  }
}
