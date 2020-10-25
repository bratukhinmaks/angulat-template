import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {QuillModule} from 'ngx-quill';
import { SearchPipe } from './pipes/search.pipe';
import {CartComponent} from './components/cart/cart.component';
import { AlertComponent } from './components/alert/alert.component';

const components = [
  SearchPipe,
  CartComponent,
];



@NgModule({
  declarations: [
    SearchPipe,
    CartComponent,
    AlertComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    QuillModule.forRoot()
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    SearchPipe,
    CartComponent,
    AlertComponent
  ]
})
export class SharedModule {
}
