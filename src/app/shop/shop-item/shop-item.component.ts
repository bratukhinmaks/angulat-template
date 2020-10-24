import { Component, OnInit } from '@angular/core';

import {ActivatedRoute, Router} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {ProductService} from '../../shared/services/product.service';

@Component({
  selector: 'app-shop-item',
  templateUrl: './shop-item.component.html',
  styleUrls: ['./shop-item.component.css']
})
export class ShopItemComponent implements OnInit {

  constructor(private prodSer: ProductService, private route: ActivatedRoute) { }
  product$ ;
  ngOnInit() {
    this.product$ = this.route.params
      .pipe(switchMap(params => {
        return this.prodSer.getById(params['id']);
      }));
  }
  addProduct(prod) {
    this.prodSer.addToCart(prod);
  }
}
