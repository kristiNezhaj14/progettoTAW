import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3001/api/v1/users/me';

  constructor(private http: HttpClient) {}

  getUserDetails(): Observable<any> {
    const token = localStorage.getItem('authToken');
    return this.http.get(this.apiUrl, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }
}
