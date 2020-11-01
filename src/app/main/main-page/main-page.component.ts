import {AfterViewInit, Component, OnInit} from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {ContentService} from '../../shared/services/content.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.sass']
})
export class MainPageComponent implements OnInit, AfterViewInit {



  components = this.content.components;

  constructor(public content: ContentService) {
  }

  ngOnInit() {
    this.content.isMain = true;
  }
  ngAfterViewInit() {
    this.content.isMain = true;
  }


  // drop(event: CdkDragDrop<string[]>) {
  //   moveItemInArray(this.components, event.previousIndex, event.currentIndex);
  // }
}
