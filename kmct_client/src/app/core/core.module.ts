import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {CoreComponent} from "./core.component";
import {OverviewComponent} from "./overview/overview.component";
import {XchangeCenterModule} from "./xchange-center/xchange-center.module";
import {CoreRoutingModule} from "./core-routing.module";
import {XchangeMarketModule} from "./xchange-market/xchange-market.module";
import {KnowledgeCenterModule} from "./knowledge-center/knowledge-center.module";
import {AlertModule, Ng2BootstrapModule, AlertConfig, TabsModule} from "ng2-bootstrap";
import {UserAdministrationModule} from "./user-administration/user-administration.module";

@NgModule({
  imports: [
    CommonModule,
    CoreRoutingModule,
    XchangeCenterModule,
    XchangeMarketModule,
    KnowledgeCenterModule,
    UserAdministrationModule,
    TabsModule
  ],
  declarations: [CoreComponent, OverviewComponent],
})
export class CoreModule {
}
