import {Component, Input, OnInit} from '@angular/core';
import {ContentService} from '../../../shared/services/content.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.sass']
})
export class BannerComponent implements OnInit {
  currentSlide = 0;
  imgs: string[];
  i = 1;
  constructor(private content: ContentService) { }

  ngOnInit() {
    this.imgs = this.content.images;
    setInterval(() => {
      this.currentSlide += this.i;
      if (this.currentSlide < 1 || this.currentSlide > 1) {
        this.i *= -1;
      }
    }, 2500);
  }

}
