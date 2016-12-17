import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {AppComponent} from "./app.component";
import {LoginComponent} from "./login/login.component";
import {LoginService} from "./login.service";
import {KmctHttpService} from "./global-services/kmct-http.service";
import {CoreModule} from "./core/core.module";
import {RouterModule, Routes} from "@angular/router";
import {UrlStoreService} from "./global-services/url-store.service";
import {SigninStateService} from "./global-services/signin-state.service";

const routes: Routes = [];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    CoreModule,
    RouterModule.forRoot(routes)
  ],
  providers: [LoginService, KmctHttpService, UrlStoreService, SigninStateService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
