import {NgModule} from "@angular/core";
import {OverviewComponent} from "./overview/overview.component";
import {XchangeCenterComponent} from "./xchange-center/xchange-center.component";
import {Routes, RouterModule} from "@angular/router";
import {CoreComponent} from "./core.component";
import {XchangeMarketComponent} from "./xchange-market/xchange-market.component";
import {KnowledgeCenterComponent} from "./knowledge-center/knowledge-center.component";
import {SigninStateService} from "../global-services/signin-state.service";
import {JournalComponent} from "./xchange-center/journal/journal.component";
import {JournalEditorComponent} from "./xchange-center/journal-editor/journal-editor.component";
import {ManageClassComponent} from "./user-administration/manage-class/manage-class.component";
import {EditProfileComponent} from "./user-administration/edit-profile/edit-profile.component";
import {ClassLeaderGuardService} from "../global-services/guards/class-leader.service";
import {UserGuardService} from "../global-services/guards/user-guard.service";
import {AdminGuardService} from "../global-services/guards/admin.service";
import {ManageClassesComponent} from "./user-administration/manage-classes/manage-classes.component";
import {CreateClassComponent} from "./user-administration/create-class/create-class.component";
import {ManageCompaniesComponent} from "./user-administration/manage-companies/manage-companies.component";
import {EditCompanyComponent} from "./user-administration/edit-company/edit-company.component";
import {QuestionCreateComponent} from "./knowledge-center/question-create/question-create.component";
import {QuestionShowComponent} from "./knowledge-center/question-show/question-show.component";
import {EditEventComponent} from "./shared-event-management/edit-event/edit-event.component";
import {CategoryListComponent} from "./knowledge-center/category-list/category-list.component";
import {CategoryCreateComponent} from "./knowledge-center/category-create/category-create.component";
import {CategoryEditComponent} from "./knowledge-center/category-edit/category-edit.component";
/**
 * Created by Maxi- PC on 17.12.2016.
 */
const coreRoutes: Routes = [{
  path: 'home',
  component: CoreComponent,
  canActivate: [SigninStateService],
  canActivateChild: [SigninStateService],
  children: [
    {
      path: '',
      component: OverviewComponent
    }, {
      path: 'xcc',
      component: XchangeCenterComponent,
      canActivate: [UserGuardService]
    }, {
      path: 'xcc/journal/:journal',
      component: JournalComponent,
      canActivate: [UserGuardService]
    }, {
      path: 'xcc/edit-journal',
      component: JournalEditorComponent,
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
      path: 'knc/show-question/:question',
      component: QuestionShowComponent,
      canActivate: [UserGuardService]
    }, {
      path: 'knc/create-question',
      component: QuestionCreateComponent,
      canActivate: [UserGuardService]
    }, {
      path: 'knc/categories',
      component: CategoryListComponent,
      canActivate: [UserGuardService]
    }, {
      path: 'knc/categories/create',
      component: CategoryCreateComponent,
      canActivate: [UserGuardService]
    }, {
      path: 'knc/categories/edit/:category',
      component: CategoryEditComponent,
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
    }, {
      path: 'uas/manage-companies',
      component: ManageCompaniesComponent,
      canActivate: [AdminGuardService]
    }, {
      path: 'uas/manage-companies/edit/:company',
      component: EditCompanyComponent,
      canActivate: [AdminGuardService]
    }, {
      path: 'uas/manage-companies/create-company',
      component: EditCompanyComponent,
      canActivate: [AdminGuardService]
    }, {
      path: 'sem/create-event',
      component: EditEventComponent,
      canActivate: [UserGuardService]
    }, {
      path: 'sem/events/:id',
      component: EditEventComponent,
      canActivate: [UserGuardService]
    }]
}];

@NgModule({
  imports: [
    RouterModule.forChild(coreRoutes)],
  exports: [RouterModule]
})
export class CoreRoutingModule {

}
