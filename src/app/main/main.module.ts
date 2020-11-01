import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainPageComponent} from './main-page/main-page.component';
import {SharedModule} from '../shared/shared.module';
import {BannerComponent} from './components/banner/banner.component';
import {AboutComponent} from './components/about/about.component';
import {MenuComponent} from './components/menu/menu.component';
import {PhotosComponent} from './components/photos/photos.component';
import {FingusComponent} from './components/fingus/fingus.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {PromotionComponent} from './components/promotion/promotion.component';
import {ShopModule} from '../shop/shop.module';
import {TeamComponent} from './components/team/team.component';
import {RouterModule} from '@angular/router';
import {CarouselModule} from 'ngx-owl-carousel-o';


@NgModule({
  declarations: [MainPageComponent, BannerComponent, AboutComponent, MenuComponent, PhotosComponent, FingusComponent, PromotionComponent, TeamComponent,],
  imports: [
    CommonModule,
    SharedModule,
    DragDropModule,
    ShopModule,
    RouterModule,
    CarouselModule
  ]
})
export class MainModule {
}
