import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../services/product.service';
import {OrderService} from '../../services/order.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Product} from '../../models';
import {AlertService} from '../../services/alert.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.sass']
})
export class CartComponent implements OnInit {

  constructor(public prodServ: ProductService, private orderServ: OrderService, private alertService: AlertService) {
  }

  cartProducts: Product[] = [];
  form: FormGroup;
  price = 0;

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      phone: new FormControl(null, Validators.required),
      adress: new FormControl(null, Validators.required),
      payment: new FormControl('cash'),
    });
    this.cartProducts = this.prodServ.cartProducts;
    for (let i = 0; i < this.cartProducts.length; i++) {
      this.price += +this.cartProducts[i].cost;
    }
  }

  removeFromCart(i) {
    this.cartProducts.splice(i, 1);
    this.price -= +this.cartProducts[i].cost;
    this.alertService.danger("Usunięto z koszyka")
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
        adress: this.form.value.adress,
        payment: this.form.value.payment,
        products: this.cartProducts,
        date: new Date(),
      };
      this.orderServ.createOrder(order).subscribe(
        res => {
          this.form.reset();
          this.alertService.success("Zamowienie przekazane do realizacji")
        }
      );
    }
  }

}
