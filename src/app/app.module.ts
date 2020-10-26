import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MainModule} from './main/main.module';
import {SharedModule} from './shared/shared.module';
import {MainLayoutComponent} from './main-layout/main-layout.component';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthInterceptore} from './shared/interceptors/auth.interceptor';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MainModule,
    SharedModule,
    BrowserAnimationsModule,
    NoopAnimationsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptore,
    multi: true,
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
