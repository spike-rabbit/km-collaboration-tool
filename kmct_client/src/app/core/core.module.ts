import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {CoreComponent} from "./core.component";
import {OverviewComponent} from "./overview/overview.component";
import {XchangeCenterModule} from "./xchange-center/xchange-center.module";
import {CoreRoutingModule} from "./core-routing.module";
import {KnowledgeCenterModule} from "./knowledge-center/knowledge-center.module";
import {TabsModule} from "ng2-bootstrap";
import {UserAdministrationModule} from "./user-administration/user-administration.module";
import {PopupsModule} from "./popups/popups.module";
import {CalendarComponent} from "angular2-fullcalendar/src/calendar/calendar";
import {CoreService} from "./core.service";
import {SharedEventManagementModule} from "./shared-event-management/shared-event-management.module";

@NgModule({
  imports: [
    CommonModule,
    CoreRoutingModule,
    XchangeCenterModule,
    KnowledgeCenterModule,
    UserAdministrationModule,
    PopupsModule,
    TabsModule,
    SharedEventManagementModule
  ],
  declarations: [CoreComponent, OverviewComponent, CalendarComponent],
  providers: [CoreService]
})
export class CoreModule {
}
