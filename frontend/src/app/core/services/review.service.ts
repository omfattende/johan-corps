import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PartReview, StoreReview, WorkshopReview } from '../models/models';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ReviewService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // ==================== RESEÑAS DE TALLERES ====================
  createWorkshopReview(workshopId: number, rating: number, comment?: string, tags?: string[]): Observable<WorkshopReview> {
    return this.http.post<WorkshopReview>(`${this.apiUrl}/workshop-reviews`, {
      workshop_id: workshopId,
      rating,
      comment,
      tags
    });
  }

  // ==================== RESEÑAS DE REFACCIONES ====================
  createPartReview(partId: number, rating: number, comment?: string): Observable<PartReview> {
    return this.http.post<PartReview>(`${this.apiUrl}/part-reviews`, {
      part_id: partId,
      rating,
      comment
    });
  }

  // ==================== RESEÑAS DE REFACCIONARIAS ====================
  createStoreReview(storeId: number, rating: number, comment?: string): Observable<StoreReview> {
    return this.http.post<StoreReview>(`${this.apiUrl}/store-reviews`, {
      store_id: storeId,
      rating,
      comment
    });
  }
}
