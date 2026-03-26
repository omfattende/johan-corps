import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaginatedResponse, Workshop, WorkshopReview } from '../models/models';
import { WorkshopFilters } from '../models/models';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class WorkshopService {
  private apiUrl = `${environment.apiUrl}/workshops`;

  constructor(private http: HttpClient) {}

  getWorkshops(filters: WorkshopFilters = {}): Observable<PaginatedResponse<Workshop>> {
    let params = new HttpParams();
    Object.entries(filters).forEach(([key, val]) => {
      if (val !== undefined && val !== null && val !== '') {
        params = params.set(key, String(val));
      }
    });
    return this.http.get<PaginatedResponse<Workshop>>(this.apiUrl, { params });
  }

  getWorkshop(id: number): Observable<Workshop> {
    return this.http.get<Workshop>(`${this.apiUrl}/${id}`);
  }

  getTypes(): Observable<Record<string, string>> {
    return this.http.get<Record<string, string>>(`${this.apiUrl}/types`);
  }

  getReviews(workshopId: number): Observable<PaginatedResponse<WorkshopReview>> {
    return this.http.get<PaginatedResponse<WorkshopReview>>(`${this.apiUrl}/${workshopId}/reviews`);
  }
}
