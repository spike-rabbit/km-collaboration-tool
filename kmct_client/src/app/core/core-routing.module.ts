import {NgModule} from "@angular/core";
import {OverviewComponent} from "./overview/overview.component";
import {XchangeCenterComponent} from "./xchange-center/xchange-center.component";
import {Routes, RouterModule} from "@angular/router";
import {CoreComponent} from "./core.component";
import {XchangeMarketComponent} from "./xchange-market/xchange-market.component";
import {KnowledgeCenterComponent} from "./knowledge-center/knowledge-center.component";
import {SigninStateService} from "../global-services/signin-state.service";
import {AusbildungsnachweisComponent} from "./xchange-center/ausbildungsnachweis/ausbildungsnachweis.component";
import {AusbildungsnachweisEditorComponent} from "./xchange-center/ausbildungsnachweis-editor/ausbildungsnachweis-editor.component";
import {ManageClassComponent} from "./user-administration/manage-class/manage-class.component";
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
      component: XchangeCenterComponent,
    }, {
      path: 'xcc/ausbildungsnachweis',
      component: AusbildungsnachweisComponent
    }, {
      path: 'xcc/ausbildungsnachweis-bearbeiten',
      component : AusbildungsnachweisEditorComponent
    }, {
      path: 'xcm',
      component: XchangeMarketComponent
    }, {
      path: 'knc',
      component: KnowledgeCenterComponent
    }, {
      path: 'uas/manage-class',
      component: ManageClassComponent
    }]
}];

@NgModule({
  imports: [
    RouterModule.forChild(coreRoutes)],
  exports: [RouterModule]
})
export class CoreRoutingModule {

}
