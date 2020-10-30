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
   typewriter_text = 'Cafe & Restaurant';
   typewriter_display = "";

  constructor(private content: ContentService) { }

  ngOnInit() {
    this.typingCallback(this);
    this.imgs = this.content.images;
  }
  typingCallback(that) {
    const total_length = that.typewriter_text.length;
    const current_length = that.typewriter_display.length;
    if (current_length < total_length) {
      that.typewriter_display += that.typewriter_text[current_length];
      setTimeout(that.typingCallback, 200, that);
    } else {
      that.typewriter_display = 'Cafe & Restaurant';
    }
  }

}
