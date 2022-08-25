import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from 'src/app/pages/interfaces/product-interface';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  public baseUrl: string = 'http://smktesting.herokuapp.com/api';

  constructor(private http: HttpClient, private router: Router) {}

  public getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/products`);
  }
}
