import {Component, Input, OnInit} from '@angular/core';
import {ProductService} from '../../shared/services/product.service';

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.sass']
})
export class FoodComponent implements OnInit {

  @Input() product;
  constructor(private prodSer: ProductService) { }

  ngOnInit(): void {
  }
  addProduct(prod) {
    this.prodSer.addToCart(prod);
  }

}
