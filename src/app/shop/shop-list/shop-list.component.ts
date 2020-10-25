import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from '../../shared/services/product.service';
import {Product} from '../../shared/models';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-shop-list',
  templateUrl: './shop-list.component.html',
  styleUrls: ['./shop-list.component.sass']
})
export class ShopListComponent implements OnInit, OnDestroy {
  products1: Product[] = [];
  sub: Subscription;
  productName: string;

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
