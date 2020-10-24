import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MainPageComponent} from './main/main-page/main-page.component';


const routes: Routes = [
  {path: '', component: MainPageComponent, pathMatch: 'full'},
  {path: 'shop', loadChildren: () => import('./shop/shop.module').then((m) => m.ShopModule)},
  {path: 'admin', loadChildren: () => import('./admin/admin.module').then((m) => m.AdminModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
