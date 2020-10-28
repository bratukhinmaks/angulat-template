import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './main-page/main-page.component';
import {SharedModule} from '../shared/shared.module';
import { BannerComponent } from './components/banner/banner.component';
import { AboutComponent } from './components/about/about.component';
import { MenuComponent } from './components/menu/menu.component';
import { PhotosComponent } from './components/photos/photos.component';
import { FingusComponent } from './components/fingus/fingus.component';
import {DragDropModule} from '@angular/cdk/drag-drop';



@NgModule({
  declarations: [MainPageComponent, BannerComponent, AboutComponent, MenuComponent, PhotosComponent, FingusComponent],
    imports: [
        CommonModule,
        SharedModule,
        DragDropModule
    ]
})
export class MainModule { }
