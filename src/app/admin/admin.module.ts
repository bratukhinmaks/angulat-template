import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import {DashboardPageComponent} from './dashboard/dashboard.component';
import { OrderComponent } from './order/order.component';
import { AddPageComponent } from './add-page/add-page.component';
import { EditPageComponent } from './edit-page/edit-page.component';
import { LoginComponent } from './login/login.component';
import { AdminLauoutComponent } from './shared/admin-lauout.component';
import {SharedModule} from '../shared/shared.module';
import {QuillModule} from 'ngx-quill';



@NgModule({
  declarations: [DashboardPageComponent, OrderComponent, AddPageComponent, EditPageComponent, LoginComponent, AdminLauoutComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    QuillModule.forRoot()
  ]
})
export class AdminModule { }
