import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';

import {HttpClient} from '@angular/common/http';
import {FbResponce} from '../models';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) {
  }

  createOrder(order) {
    return this.http.post(`${environment.baseUrl}/order/${environment.shopId}`, order);
  }

  getAll() {
    return this.http.get(`${environment.baseUrl}/order/restaurant/${environment.shopId}`);
  }

  changeStatus(id, status) {
    return this.http.patch(`${environment.baseUrl}/order/${id}`, {'status': status});
  }
  deleteOrder(id) {
    return this.http.delete(`${environment.baseUrl}/order/${environment.shopId}/${id}`);
  }
}
