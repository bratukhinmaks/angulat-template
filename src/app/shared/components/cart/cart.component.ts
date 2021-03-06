import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../services/product.service';
import {OrderService} from '../../services/order.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Product} from '../../models';
import {AlertService} from '../../services/alert.service';
import {ContentService} from '../../services/content.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.sass']
})
export class CartComponent implements OnInit {

  constructor(public prodServ: ProductService, private orderServ: OrderService, private alertService: AlertService, private content: ContentService) {
  }

  cartProducts: Product[] = [];
  form: FormGroup;
  price = 0;
  productAdded: boolean;

  ngOnInit(): void {
    this.content.isMain = false;
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      phone: new FormControl(null, Validators.required),
      address: new FormControl(null, Validators.required),
      payment: new FormControl('cash', Validators.required),
      delivery: new FormControl('cash', Validators.required),
    });
    this.cartProducts = this.prodServ.cartProducts;
    for (let i = 0; i < this.cartProducts.length; i++) {
      this.price += +this.cartProducts[i].cost;
    }
  }

  removeFromCart(i) {
    this.alertService.danger("Usunięto z koszyka");
    this.cartProducts.splice(i, 1);
    this.price -= +this.cartProducts[i].cost;
  }

  submit() {
    if (this.form.invalid) {
      return;
    } else {
      const order = {
        name: this.form.value.name,
        order: this.cartProducts,
        phone: this.form.value.phone,
        price: this.price,
        address: this.form.value.adress,
        payment: this.form.value.payment,
        products: this.cartProducts,
        delivery: this.form.value.delivery,
        date: new Date(),
        status: 'CONFIRMED'
      };
      this.orderServ.createOrder(order).subscribe(
        res => {
          this.form.reset();
          this.alertService.success("Zamowienie przekazane do realizacji");
          this.prodServ.cartProducts = [];
          this.cartProducts = [];
          this.productAdded = true;
        }
      );
    }
  }

}
