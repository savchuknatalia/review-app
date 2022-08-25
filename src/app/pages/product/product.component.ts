import { Component, OnInit } from '@angular/core';
import { Navigation, Router } from '@angular/router';
import { Product } from '../interfaces/product-interface';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  public product: Product;

  constructor(private router: Router) {
    let nav: Navigation | null = this.router.getCurrentNavigation();
    if (nav?.extras && nav.extras.state && nav.extras.state['product']) {
      this.product = nav.extras.state['product'];
    }
  }

  ngOnInit(): void {}
}
