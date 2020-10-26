import {Component, Input, OnInit} from '@angular/core';
import {ProductService} from '../../shared/services/product.service';
import {AlertService} from '../../shared/services/alert.service';

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.sass']
})
export class FoodComponent implements OnInit {

  @Input() product;
  constructor(private prodSer: ProductService, private alertServ: AlertService) { }

  ngOnInit(): void {
  }
  addProduct(prod) {
    this.prodSer.addToCart(prod);
    this.alertServ.success('Produkt został dodany do koszyka')
  }

}
