import {Component, OnInit, HostBinding} from '@angular/core';
import {Category} from "../category";
import {slideInOutAnimation} from "../../router-animations";
import {KnowledgeCenterService} from "../knowledge-center.service";

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

  categories: Category[];

  constructor(private service: KnowledgeCenterService) { }

  ngOnInit() {
    this.categories = this.service.categories;
  }

}
