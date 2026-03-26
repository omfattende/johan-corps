import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class VehicleService {
  private apiUrl = `${environment.apiUrl}/vehicles`;

  constructor(private http: HttpClient) {}

  getBrands(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/brands`);
  }

  getModels(brand?: string): Observable<string[]> {
    let params = new HttpParams();
    if (brand) params = params.set('brand', brand);
    return this.http.get<string[]>(`${this.apiUrl}/models`, { params });
  }

  getYears(brand?: string, model?: string): Observable<number[]> {
    let params = new HttpParams();
    if (brand) params = params.set('brand', brand);
    if (model) params = params.set('model', model);
    return this.http.get<number[]>(`${this.apiUrl}/years`, { params });
  }

  getEngines(brand?: string, model?: string, year?: number | string): Observable<string[]> {
    let params = new HttpParams();
    if (brand) params = params.set('brand', brand);
    if (model) params = params.set('model', model);
    if (year) params = params.set('year', String(year));
    return this.http.get<string[]>(`${this.apiUrl}/engines`, { params });
  }
}
