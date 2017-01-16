import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {CoreComponent} from "./core.component";
import {OverviewComponent} from "./overview/overview.component";
import {XchangeCenterModule} from "./xchange-center/xchange-center.module";
import {CoreRoutingModule} from "./core-routing.module";
import {XchangeMarketModule} from "./xchange-market/xchange-market.module";
import {KnowledgeCenterModule} from "./knowledge-center/knowledge-center.module";
import {TabsModule} from "ng2-bootstrap";
import {UserAdministrationModule} from "./user-administration/user-administration.module";
import {PopupsModule} from "./popups/popups.module";
import {CalendarComponent} from "angular2-fullcalendar/src/calendar/calendar";
import {CoreService} from "./core.service";

@NgModule({
  imports: [
    CommonModule,
    CoreRoutingModule,
    XchangeCenterModule,
    XchangeMarketModule,
    KnowledgeCenterModule,
    UserAdministrationModule,
    PopupsModule,
    TabsModule
  ],
  declarations: [CoreComponent, OverviewComponent, CalendarComponent],
  providers: [CoreService]
})
export class CoreModule {
}
