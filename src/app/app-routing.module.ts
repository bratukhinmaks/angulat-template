import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MainPageComponent} from './main/main-page/main-page.component';
import {MainLayoutComponent} from './main-layout/main-layout.component';
import {CartComponent} from './shared/components/cart/cart.component';


const routes: Routes = [
  {
    path: '', component: MainLayoutComponent, children: [
      {path: '', redirectTo: 'main', pathMatch: 'full'},
      {path: 'main', component: MainPageComponent},
      {path: 'cart', component: CartComponent},
      {path: 'shop', loadChildren: () => import('./shop/shop.module').then((m) => m.ShopModule)},
    ]
  },
  {path: 'admin', loadChildren: () => import('./admin/admin.module').then((m) => m.AdminModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
