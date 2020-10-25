import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.sass']
})
export class BannerComponent implements OnInit {
  @Input() imgs: string[];
  currentSlide = 0;
  i = 1;
  constructor() { }

  ngOnInit() {
    setInterval(() => {
      this.currentSlide += this.i;
      if (this.currentSlide < 1 || this.currentSlide > 1) {
        this.i *= -1;
      }
    }, 2500);
  }

}
