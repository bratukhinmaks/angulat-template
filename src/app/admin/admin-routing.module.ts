import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {AddPageComponent} from './add-page/add-page.component';
import {EditPageComponent} from './edit-page/edit-page.component';
import {DashboardPageComponent} from './dashboard/dashboard.component';
import {OrderComponent} from './order/order.component';
import {AuthGuard} from '../shared/guards/auth.guard';
import {AdminLauoutComponent} from './shared/admin-lauout.component';


const routes: Routes = [
  {path: '', component: AdminLauoutComponent, children: [
      {path: '', redirectTo: 'admin/login', pathMatch: 'full' },
      {path: 'login', component: LoginComponent},
      {path: 'add-page', component: AddPageComponent, canActivate: [AuthGuard]},
      {path: 'product/:id/edit-page', component: EditPageComponent, canActivate: [AuthGuard]},
      {path: 'dashboard', component: DashboardPageComponent, canActivate: [AuthGuard]},
      {path: 'order', component: OrderComponent, canActivate: [AuthGuard]},
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
