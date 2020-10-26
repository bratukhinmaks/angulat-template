import { Pipe, PipeTransform } from '@angular/core';
import {Product} from '../models';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(products: Product[], cat: string): Product[] {
    if (cat === null || cat === '' || cat === undefined) {
      return products;
    } else {
      return products.filter(product => product.category === cat);
    }
  }

}
