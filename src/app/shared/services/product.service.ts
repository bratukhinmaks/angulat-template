import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {concatAll, map} from 'rxjs/operators';
import {FbResponce, Product} from '../models';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  cat = 'main';
  cartProducts: Product [] = [];

  constructor(private http: HttpClient) {
  }

  create(product) {
    return this.http.post(`${environment.baseUrl}/product/${environment.shopId}`, product)
  }

  getAll() {
    return this.http.get(`${environment.baseUrl}/product/restaurant/${environment.shopId}`);
  }

  getById(id) {
    return this.http.get(`${environment.baseUrl}/product/${id}`);
  }

  deleteItem(id) {
    return this.http.delete(`${environment.baseUrl}/product/${environment.shopId}/${id}`);
  }

  updateItem(product: Product) {
    return this.http.patch(`${environment.baseUrl}/product/${product._id}`, product);
  }

  setType(cat) {
    this.cat = cat;
  }

  addToCart(prod) {
    this.cartProducts.push(prod);
  }


}
