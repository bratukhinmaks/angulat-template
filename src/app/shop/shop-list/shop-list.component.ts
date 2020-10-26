import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from '../../shared/services/product.service';
import {Product} from '../../shared/models';
import {Subscription} from 'rxjs';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-shop-list',
  templateUrl: './shop-list.component.html',
  styleUrls: ['./shop-list.component.sass'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({
        opacity: 0
      })),
      transition('void <=> *', animate(2000)),
    ]),
  ]
})
export class ShopListComponent implements OnInit, OnDestroy {
  products1: Product[] = [];
  sub: Subscription;
  productName: string;
  categories = [
    {name: 'Wszystkie', value: null},
    {name: 'Danie Głowne', value: 'main'},
    {name: 'Zupy', value: 'soups'},
    {name: 'Sałatki', value: 'salads'},
  ];
  cat: string;

  constructor(private prodSer: ProductService) {
  }

  ngOnInit() {
    this.sub = this.prodSer.getAll().subscribe((data: Product[]) => {
      this.products1 = data;
    });
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
