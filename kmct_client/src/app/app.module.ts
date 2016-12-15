import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {TestService} from "./test.service";
import { LoginComponent } from './login/login.component';
import {LoginService} from "./login.service";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [TestService, LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
