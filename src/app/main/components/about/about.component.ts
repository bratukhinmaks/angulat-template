import {Component, Input, OnInit} from '@angular/core';
import {ContentService} from '../../../shared/services/content.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.sass']
})
export class AboutComponent implements OnInit {
  @Input() text;
  visible = this.content.isAbout;

  constructor(public content: ContentService) { }

  ngOnInit() {
  }


  delete() {
    this.content.delete();
  }
}
