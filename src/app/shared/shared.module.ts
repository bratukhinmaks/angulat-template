import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {QuillModule} from 'ngx-quill';

const components = [];
const moduls = [
  ReactiveFormsModule,
  FormsModule,
  HttpClientModule,
  QuillModule.forRoot()
];


@NgModule({
  declarations: [
    ...components
  ],
  imports: [
    CommonModule,
      ...moduls
  ],
  exports: [
    ...moduls,
    ...components,
  ]
})
export class SharedModule {
}