import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './main-page/main-page.component';
import {SharedModule} from '../shared/shared.module';
import { BannerComponent } from './banner/banner.component';
import { AboutComponent } from './about/about.component';
import { MenuComponent } from './menu/menu.component';
import { PhotosComponent } from './photos/photos.component';
import { FingusComponent } from './fingus/fingus.component';



@NgModule({
  declarations: [MainPageComponent, BannerComponent, AboutComponent, MenuComponent, PhotosComponent, FingusComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class MainModule { }
