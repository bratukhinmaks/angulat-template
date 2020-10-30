import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopRoutingModule } from './shop-routing.module';
import { ShopListComponent } from './shop-list/shop-list.component';
import { ShopItemComponent } from './shop-item/shop-item.component';
import {SharedModule} from '../shared/shared.module';
import { FoodComponent } from './food/food.component';



@NgModule({
  declarations: [ShopListComponent, ShopItemComponent, FoodComponent],
  imports: [
    CommonModule,
    ShopRoutingModule,
    SharedModule
  ],
  exports: [
    ShopListComponent,
    FoodComponent
  ]
})
export class ShopModule { }
