import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../shared/services/product.service';

@Component({
  selector: 'app-shop-list',
  templateUrl: './shop-list.component.html',
  styleUrls: ['./shop-list.component.sass']
})
export class ShopListComponent implements OnInit {

  products$;
  productName: string;
  constructor(private prodSer: ProductService) { }

  ngOnInit() {
    this.products$ = this.prodSer.getAll();
  }
}
