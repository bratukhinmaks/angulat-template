import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopRoutingModule } from './shop-routing.module';
import { ShopListComponent } from './shop-list/shop-list.component';
import { ShopItemComponent } from './shop-item/shop-item.component';
import {SharedModule} from '../shared/shared.module';


@NgModule({
  declarations: [ShopListComponent, ShopItemComponent],
  imports: [
    CommonModule,
    ShopRoutingModule,
    SharedModule
  ]
})
export class ShopModule { }
