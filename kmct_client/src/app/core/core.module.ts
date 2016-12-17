import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {CoreComponent} from "./core.component";
import {OverviewComponent} from "./overview/overview.component";
import {XchangeCenterModule} from "./xchange-center/xchange-center.module";
import {CoreRoutingModule} from "./core-routing.module";
import {XchangeMarketModule} from "./xchange-market/xchange-market.module";
import {KnowledgeCenterModule} from "./knowledge-center/knowledge-center.module";


@NgModule({
  imports: [
    CommonModule,
    CoreRoutingModule,
    XchangeCenterModule,
    XchangeMarketModule,
    KnowledgeCenterModule
  ],
  declarations: [CoreComponent, OverviewComponent]
})
export class CoreModule {
}
