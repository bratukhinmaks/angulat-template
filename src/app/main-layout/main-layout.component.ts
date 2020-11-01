import {Component, ElementRef, HostListener, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {ProductService} from '../shared/services/product.service';
import {ContentService} from '../shared/services/content.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.sass']
})
export class MainLayoutComponent implements OnInit {
  isExpanded = true;
  isSticky = true;
  @ViewChild('nav', {static: true}) nav: ElementRef;
  navs = [
    {title: 'O nas', id: 'about'},
    {title: 'Promocji', id: 'promotion'},
    {title: 'Menu', id: 'menu'},
    {title: 'Team', id: 'team'},
    {title: 'Kontakt', id: 'contact'},
  ];
  currentSlide: number;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.checkFun(this.nav);
  }

  constructor(public prodServ: ProductService, public contentServ: ContentService) {
  }

  ngOnInit() {
  }

  scroll(element: string, id: number) {
    this.currentSlide = id;
    const item = document.getElementById(element);
    scrollTo(0, item.offsetTop);
    this.isExpanded = true;
  }

  checkFun(el: ElementRef) {
    if (el.nativeElement.classList.contains('sticky')) {
      this.isSticky = false;
    } else {
      this.isSticky = true;
    }
  }


}
