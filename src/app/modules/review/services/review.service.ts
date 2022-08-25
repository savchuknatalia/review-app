import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReviewDataOutput } from 'src/app/modules/review/interfaces/review-interface';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  public baseUrl: string = 'http://smktesting.herokuapp.com/api';

  constructor(private http: HttpClient) {}

  public getReviews(product_id: number): Observable<ReviewDataOutput[]> {
    return this.http.get<ReviewDataOutput[]>(
      `${this.baseUrl}/reviews/${product_id}`
    );
  }
}
