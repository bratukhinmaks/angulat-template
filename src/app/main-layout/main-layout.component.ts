import { Component, OnInit } from '@angular/core';
import {ProductService} from '../shared/services/product.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.sass']
})
export class MainLayoutComponent implements OnInit {
  isExpanded = true;

  constructor(public prodServ: ProductService) { }

  ngOnInit() {
  }

}
