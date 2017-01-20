import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {AppComponent} from "./app.component";
import {LoginComponent} from "./login/login.component";
import {LoginService} from "./login.service";
import {CoreModule} from "./core/core.module";
import {RouterModule, Routes} from "@angular/router";
import {ClassLeaderGuardService} from "./global-services/guards/class-leader.service";
import {AdminGuardService} from "./global-services/guards/admin.service";
import {UserGuardService} from "./global-services/guards/user-guard.service";
import {GlobalServicesModule} from "./global-services/global-services.module";
import {LoginGuardService} from "./global-services/guards/login-guard.service";

const routes: Routes = [{path: "login", component: LoginComponent, canActivate: [LoginGuardService]}, {path: "", redirectTo: "home", pathMatch: "full"}];

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
    RouterModule.forRoot(routes),
    GlobalServicesModule
  ],
  providers: [LoginService, ClassLeaderGuardService, AdminGuardService, UserGuardService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
