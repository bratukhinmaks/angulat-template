import {Component, OnDestroy, OnInit} from '@angular/core';
import {OrderService} from '../../shared/services/order.service';
import {Subscription} from 'rxjs';



@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.sass'],
})
export class OrderComponent implements OnInit, OnDestroy {
  orders: any[] = [];
  oSub: Subscription;
  rSub: Subscription;
  order: any;
  price = 0;
  statuses: { value: string, text: string }[] = [
    {value: null, text: 'Wszystkie'},
    {value: 'COMPLETED', text: 'Realizowane'},
    {value: 'IN_PROGRESS', text: 'W procesie'},
    {value: 'CONFIRMED', text: 'Przyjęte'}
  ];
  status = 'status';
  stat: string;
  selectedDate: Date;
  date: Date;


  constructor(private orderSer: OrderService) {
  }

  ngOnInit(): void {
    this.oSub = this.orderSer.getAll().subscribe((orders: any) => {
      this.orders = orders.reverse();
      for (let i = 0; i < this.orders.length; i++) {
        this.price += this.orders[i].price;
      }
    });
    console.log(this.selectedDate)
  }

  setStatus(id: number, status: string) {
    this.orderSer.changeStatus(id, status)
      .subscribe(() => {
        this.order = this.orders.filter(order => order._id === id);
        this.order[0].status = status;
      });
  }


  ngOnDestroy(): void {
    if (this.oSub) {
      this.oSub.unsubscribe();
    }
    if (this.rSub) {
      this.rSub.unsubscribe();
    }

  }

  changeValue(index: number) {
    this.price = 0;
    this.stat = this.statuses[index].value;
    let filterByAll;
    const filteredOrders = this.orders.filter(order => order.status === this.stat);
    if (this.selectedDate === null || this.selectedDate === undefined  ) {
       filterByAll = filteredOrders;
    } else {
      filterByAll = filteredOrders.filter(order => {
        const OrderDay = new Date(order.date).getDay();
        // @ts-ignore
        const SelectedDay = new Date(this.selectedDate._d).getDay();
        return OrderDay === SelectedDay;
      });
    }
    for (let i = 0; i < filterByAll.length; i++) {
      this.price += filteredOrders[i].price;
    }
  }

  changeDate(selectedDate: Date) {
    this.price = 0;
    this.selectedDate = selectedDate;
    const filteredByDate = this.orders.filter(order => {
      const OrderDay = new Date(order.date).getDay();
      // @ts-ignore
      const SelectedDay = new Date(this.selectedDate._d).getDay();
      return OrderDay === SelectedDay;
    });
    const filteredByAll = filteredByDate.filter(order => order.status === this.stat);
    for (let i = 0; i < filteredByAll.length; i++) {
      this.price += filteredByAll[i].price;
    }
  }
}
