import { Injectable } from '@angular/core';
import {Question} from "./question";
import {Answer} from "./answer";
import {Category} from "./category";

@Injectable()
export class KnowledgeCenterService {

  questions: Question[] = [new Question(1,'Frage1', 'Das ist meine Frage...', '', 'Paula', [new Answer(1, 'Antwort', 2)]),
    new Question(2,'Frage2', 'Das ist meine zweite Frage...', '', 'Leon', []) ];

  categories: Category[] = [new Category(1,'ITM'), new Category(2,'Kostenrechnung'), new Category(3,'Organisatorisches: Studium')];

  constructor() {
    this.questions[0].category = this.categories[0].category;
    this.questions[1].category = this.categories[1].category;
  }

}
