import { Pipe, PipeTransform } from '@angular/core';
import {Product} from '../models';

@Pipe({
  name: 'filter',
  pure: false
})
export class FilterPipe implements PipeTransform {

  transform(products: Product[], field: any, cat: any): Product[] {
    if (cat === null || cat === '' || cat === undefined) {
      return products;
    } else {
      return products.filter(product => product[field] === cat);
    }
  }

}
