import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Product } from '../interfaces/product-interface';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  public products: Product[];
  private unsubscribeSubject: Subject<void> = new Subject<void>();

  constructor(
    public productsService: ProductsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  public goTo(product: Product): void {
    this.router.navigate(['product', product.id], { state: { product } });
  }

  private loadProducts(): void {
    this.productsService.getProducts()
    .pipe(takeUntil(this.unsubscribeSubject))
    .subscribe((data) => {
      this.products = data;
    });
  }
}
