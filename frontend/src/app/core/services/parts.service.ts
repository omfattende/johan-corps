import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Part, PaginatedResponse, PartFilters, PartReview } from '../models/models';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class PartsService {
  private apiUrl = `${environment.apiUrl}/parts`;

  constructor(private http: HttpClient) {}

  getParts(filters: PartFilters = {}): Observable<PaginatedResponse<Part>> {
    let params = new HttpParams();
    Object.entries(filters).forEach(([key, val]) => {
      if (val !== undefined && val !== null && val !== '') {
        params = params.set(key, String(val));
      }
    });
    return this.http.get<PaginatedResponse<Part>>(this.apiUrl, { params });
  }

  getPart(id: number): Observable<Part> {
    return this.http.get<Part>(`${this.apiUrl}/${id}`);
  }

  getAlternatives(id: number): Observable<Part[]> {
    return this.http.get<Part[]>(`${this.apiUrl}/${id}/alternatives`);
  }

  getCategories(): Observable<Record<string, string>> {
    return this.http.get<Record<string, string>>(`${this.apiUrl}/categories`);
  }

  getReviews(partId: number): Observable<PaginatedResponse<PartReview>> {
    return this.http.get<PaginatedResponse<PartReview>>(`${this.apiUrl}/${partId}/reviews`);
  }
}
