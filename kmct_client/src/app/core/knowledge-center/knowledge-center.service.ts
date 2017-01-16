import {Injectable} from "@angular/core";
import {Question} from "./question";
import {Category} from "./category";

@Injectable()
export class KnowledgeCenterService {

  categories: Category[] = [{category: "ITM", id: 1}, {category: "Organisatorisches: Studium", id: 2}];

  questions: Question[] = [{
    id: 234,
    category: this.categories[0],
    title: "Wie geht was?",
    owner: "Paula",
    answers: [{id:1, votes:1, answer:"Das ist meine Antwort. Das ist meine Antwort. Das ist meine Antwort. Das ist meine Antwort. " +
    "Das ist meine Antwort. Das ist meine Antwort. Das ist meine Antwort. Das ist meine Antwort. Das ist meine Antwort. " +
    "Das ist meine Antwort. Das ist meine Antwort. Das ist meine Antwort. Das ist meine Antwort."},
      {id:2, votes:4, answer:"Das ist meine Antwort. Das ist meine Antwort. Das ist meine Antwort. Das ist meine Antwort. " +
      "Das ist meine Antwort. Das ist meine Antwort. Das ist meine Antwort. Das ist meine Antwort. Das ist meine Antwort. " +
      "Das ist meine Antwort. Das ist meine Antwort. Das ist meine Antwort. Das ist meine Antwort."}],
    question: "Das ist meine Frage. Das ist meine Frage. Das ist meine Frage. Das ist meine Frage. Das ist meine Frage. Das ist meine Frage. " +
    "Das ist meine Frage. Das ist meine Frage. Das ist meine Frage. Das ist meine Frage. Das ist meine Frage. Das ist meine Frage. "
  }];


  constructor() {
  }

}
