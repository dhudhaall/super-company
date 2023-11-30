import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SuperService {
  
  private apiUrl = 'https://catfact.ninja/fact';
  private apiUrlSun = 'https://api.sunrise-sunset.org/json';

  constructor(private http: HttpClient) {}

  getCatFact(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getSunriseSunset(lat: string, lng: string, date: string): Observable<any> {
    const params = { lat: lat.toString(), lng: lng.toString(), date: date };
    return this.http.get(this.apiUrlSun, { params: params });
  }
}
