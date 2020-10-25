import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ShopListComponent} from './shop-list/shop-list.component';
import {ShopItemComponent} from './shop-item/shop-item.component';


const routes: Routes = [
  {path: '', component: ShopListComponent, pathMatch: 'full'},
  {path: ':id', component: ShopItemComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopRoutingModule {
}
