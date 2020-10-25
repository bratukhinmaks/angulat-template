import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from '../../shared/services/product.service';
import {Subscription} from 'rxjs';
import {AuthService} from '../../shared/services/auth.service';
import {AlertService} from '../../shared/services/alert.service';
import {Product} from '../../shared/models';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  products = [];
  pSub: Subscription;
  rSub: Subscription;
  productName: string;
  constructor(private prodSer: ProductService, private alertService: AlertService ) { }

  ngOnInit() {
    this.pSub = this.prodSer.getAll().subscribe(
      (res: Product[]) => {
        this.products = res;
      }
    );
  }
  ngOnDestroy(): void {
    if (this.pSub) {
      this.pSub.unsubscribe();
    }
    if (this.rSub) {
      this.rSub.unsubscribe();
    }
  }
  delete(id) {
    this.rSub = this.prodSer.deleteItem(id).subscribe(
      () => {
        this.products = this.products.filter(product => product._id !== id);
      }
    )
    this.alertService.danger('Product zostal usunięty');
  }


}
