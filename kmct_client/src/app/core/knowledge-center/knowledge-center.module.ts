import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KnowledgeCenterComponent } from './knowledge-center.component';
import { QuestionCreateComponent } from './question-create/question-create.component';
import { RouterModule } from "@angular/router";
import { QuestionShowComponent } from './question-show/question-show.component';
import {FormsModule} from "@angular/forms";
import {KnowledgeCenterService} from "./knowledge-center.service";
import {XchangeCenterModule} from "../xchange-center/xchange-center.module";
import { QuestionListComponent } from './question-list/question-list.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryCreateComponent } from './category-create/category-create.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    XchangeCenterModule
  ],
  declarations: [KnowledgeCenterComponent, QuestionCreateComponent, QuestionShowComponent, QuestionListComponent, CategoryListComponent, CategoryCreateComponent],
  providers: [KnowledgeCenterService]
})
export class KnowledgeCenterModule { }
