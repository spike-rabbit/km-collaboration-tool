import {Injectable} from "@angular/core";
import {Question} from "./question";
import {Category} from "./category";

@Injectable()
export class KnowledgeCenterService {

  categories: Category[] = [{category: "1", id: 1}, {category: "2", id: 2}];

  questions: Question[] = [{
    id: 234,
    category: this.categories[0],
    title: "asdfasdf",
    owner: "",
    answers: [],
    question: ""
  }];


  constructor() {
  }

}
