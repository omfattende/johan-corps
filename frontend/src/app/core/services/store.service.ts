import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaginatedResponse, Store, StoreFilters } from '../models/models';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class StoreService {
  private apiUrl = `${environment.apiUrl}/stores`;

  constructor(private http: HttpClient) {}

  getStores(filters: StoreFilters = {}): Observable<PaginatedResponse<Store>> {
    let params = new HttpParams();
    Object.entries(filters).forEach(([key, val]) => {
      if (val !== undefined && val !== null && val !== '') {
        params = params.set(key, String(val));
      }
    });
    return this.http.get<PaginatedResponse<Store>>(this.apiUrl, { params });
  }

  getStore(id: number): Observable<Store> {
    return this.http.get<Store>(`${this.apiUrl}/${id}`);
  }

  getTypes(): Observable<Record<string, string>> {
    return this.http.get<Record<string, string>>(`${this.apiUrl}/types`);
  }
}
