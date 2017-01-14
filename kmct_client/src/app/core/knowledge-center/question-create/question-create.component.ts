import {Component, OnInit, HostBinding} from '@angular/core';
import {Category} from "../category";
import {slideInOutAnimation} from "../../router-animations";

@Component({
  selector: 'app-question-create',
  templateUrl: './question-create.component.html',
  styleUrls: ['./question-create.component.css'],
  animations: [slideInOutAnimation]
})
export class QuestionCreateComponent implements OnInit {
  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display')   display = 'block';
  @HostBinding('style.position')  position = 'absolute';

  categories: Category[] = [new Category(1,'ITM'), new Category(2,'Kostenrechnung'), new Category(3,'Organisatorisches: Studium')];

  constructor() { }

  ngOnInit() {
  }

}
