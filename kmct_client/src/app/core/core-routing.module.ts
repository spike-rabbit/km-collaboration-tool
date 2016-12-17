import {NgModule} from "@angular/core";
import {OverviewComponent} from "./overview/overview.component";
import {XchangeCenterComponent} from "./xchange-center/xchange-center.component";
import {Routes, RouterModule} from "@angular/router";
import {CoreComponent} from "./core.component";
import {XchangeMarketComponent} from "./xchange-market/xchange-market.component";
import {KnowledgeCenterComponent} from "./knowledge-center/knowledge-center.component";
import {SigninStateService} from "../global-services/signin-state.service";
/**
 * Created by Maxi- PC on 17.12.2016.
 */
const coreRoutes: Routes = [{
  path: 'home',
  component: CoreComponent,
  canActivate: [SigninStateService],
  children: [
    {
      path: '',
      component: OverviewComponent
    }, {
      path: 'xcc',
      component: XchangeCenterComponent
    }, {
      path: 'xcm',
      component: XchangeMarketComponent
    }, {
      path: 'knc',
      component: KnowledgeCenterComponent
    }]
}];

@NgModule({
  imports: [
    RouterModule.forChild(coreRoutes)],
  exports: [RouterModule]
})
export class CoreRoutingModule {

}
