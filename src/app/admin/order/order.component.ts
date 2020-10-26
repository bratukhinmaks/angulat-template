import {Component, OnDestroy, OnInit} from '@angular/core';
import {OrderService} from '../../shared/services/order.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.sass']
})
export class OrderComponent implements OnInit, OnDestroy {
  orders: any[] = [];
  oSub: Subscription;
  rSub: Subscription;
  price = 0;

  constructor(private orderSer: OrderService) {
  }

  ngOnInit(): void {
    this.oSub = this.orderSer.getAll().subscribe((orders: any) => {
      this.orders = orders.reverse();
      for (let i = 0; i < this.orders.length; i++) {
        this.price += this.orders[i].price;
      }
    });
  }

  setStatus(id: number, inprogress: string) {

  }

  ngOnDestroy(): void {
    if (this.oSub) {
      this.oSub.unsubscribe();
    }
    if (this.rSub) {
      this.rSub.unsubscribe();
    }

  }
}
