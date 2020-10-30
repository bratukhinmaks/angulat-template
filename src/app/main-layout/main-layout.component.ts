import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ProductService} from '../shared/services/product.service';
import {ContentService} from '../shared/services/content.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.sass']
})
export class MainLayoutComponent implements OnInit {
  isExpanded = true;

  constructor(public prodServ: ProductService, public contentServ: ContentService) { }

  ngOnInit() {}

  scroll(element: string) {
    const item = document.getElementById(element);
    scrollTo(0, item.offsetTop);
  }


}
