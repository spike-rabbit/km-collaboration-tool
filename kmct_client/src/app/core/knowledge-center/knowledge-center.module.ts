import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KnowledgeCenterComponent } from './knowledge-center.component';
import { QuestionCreateComponent } from './question-create/question-create.component';
import {RouterModule} from "@angular/router";

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [KnowledgeCenterComponent, QuestionCreateComponent]
})
export class KnowledgeCenterModule { }
