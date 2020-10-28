import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFilter'
})
export class DateFilterPipe implements PipeTransform {

  transform(orders: any, date: Date): any {
    if(date === null  || date === undefined) {
      return orders;
    }
    return orders.filter(order => {
      const OrderDay = new Date(order.date).getDay();
      // @ts-ignore
      const SelectedDay = new Date(date._d).getDay();
      return OrderDay === SelectedDay;
    });
  }

}
