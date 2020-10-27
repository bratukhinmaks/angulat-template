import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {SearchPipe} from './pipes/search.pipe';
import {CartComponent} from './components/cart/cart.component';
import {AlertComponent} from './components/alert/alert.component';
import {FilterPipe} from './pipes/filter.pipe';
import { DateFilterPipe } from './pipes/date-filter.pipe';

const components = [
  CartComponent,
  SearchPipe,
  CartComponent,
  AlertComponent,
  FilterPipe,
];

const moduls = [
  CommonModule,
  ReactiveFormsModule,
  FormsModule,
  HttpClientModule,
];


@NgModule({
  declarations: [
    ...components,
    DateFilterPipe
  ],
  imports: [
    ...moduls
  ],
  exports: [
    ...components,
    ...moduls,
    DateFilterPipe
  ]
})
export class SharedModule {
}
