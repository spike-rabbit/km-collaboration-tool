import {Component, OnInit} from '@angular/core';
import {Category} from "../category";

@Component({
  selector: 'app-question-create',
  templateUrl: './question-create.component.html',
  styleUrls: ['./question-create.component.css']
})
export class QuestionCreateComponent implements OnInit {

  categories: Category[] = [new Category(1,'ITM'), new Category(2,'Kostenrechnung'), new Category(3,'Organisatorisches: Studium')];

  constructor() { }

  ngOnInit() {
  }

}
