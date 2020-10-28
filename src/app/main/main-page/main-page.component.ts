import {Component, OnInit} from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {DomSanitizer} from '@angular/platform-browser';
import {AppComponent} from '../../app.component';
import {AboutComponent} from '../components/about/about.component';
import {MenuComponent} from '../components/menu/menu.component';
import {PhotosComponent} from '../components/photos/photos.component';
import {FingusComponent} from '../components/fingus/fingus.component';
import {BannerComponent} from '../components/banner/banner.component';
import {ContentService} from '../../shared/services/content.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.sass']
})
export class MainPageComponent implements OnInit {



  components = this.content.components;

  constructor(public content: ContentService) {
  }

  ngOnInit() {
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.components, event.previousIndex, event.currentIndex);
  }
}
