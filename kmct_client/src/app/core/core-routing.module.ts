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
import {EditProfileComponent} from "./user-administration/edit-profile/edit-profile.component";
import {ClassLeaderGuardService} from "../global-services/guards/class-leader.service";
import {UserGuardService} from "../global-services/guards/user-guard.service";
import {AdminGuardService} from "../global-services/guards/admin.service";
import {ManageClassesComponent} from "./user-administration/manage-classes/manage-classes.component";
import {CreateClassComponent} from "./user-administration/create-class/create-class.component";
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
      canActivate: [UserGuardService]
    }, {
      path: 'xcc/ausbildungsnachweis/:ausbildungsnachweis',
      component: AusbildungsnachweisComponent,
      canActivate: [UserGuardService]
    }, {
      path: 'xcc/ausbildungsnachweis-bearbeiten',
      component : AusbildungsnachweisEditorComponent,
      canActivate: [UserGuardService]
    }, {
      path: 'xcm',
      component: XchangeMarketComponent,
      canActivate: [UserGuardService]
    }, {
      path: 'knc',
      component: KnowledgeCenterComponent,
      canActivate: [UserGuardService]
    }, {
      path: 'uas/manage-class',
      component: ManageClassComponent,
      canActivate: [ClassLeaderGuardService]
    }, {
      path: 'uas/edit-profile',
      component: EditProfileComponent
    }, {
      path: 'uas/manage-classes',
      component: ManageClassesComponent,
      canActivate: [AdminGuardService]
    }, {
      path: 'uas/manage-classes/create',
      component: CreateClassComponent,
      canActivate: [AdminGuardService]
    }]
}];

@NgModule({
  imports: [
    RouterModule.forChild(coreRoutes)],
  exports: [RouterModule]
})
export class CoreRoutingModule {

}
