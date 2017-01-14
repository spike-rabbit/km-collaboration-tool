import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KnowledgeCenterComponent } from './knowledge-center.component';
import { QuestionCreateComponent } from './question-create/question-create.component';
import { RouterModule } from "@angular/router";
import { QuestionShowComponent } from './question-show/question-show.component';
import {FormsModule} from "@angular/forms";
import {KnowledgeCenterService} from "./knowledge-center.service";

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  declarations: [KnowledgeCenterComponent, QuestionCreateComponent, QuestionShowComponent],
  providers: [KnowledgeCenterService]
})
export class KnowledgeCenterModule { }
