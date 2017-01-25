import {Component, OnInit, HostBinding} from '@angular/core';
import {Category} from "../category";
import {slideInOutAnimation} from "../../router-animations";
import {KnowledgeCenterService} from "../knowledge-center.service";
import {Router} from "@angular/router";

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
  question: string;
  categorySelected: number;
  title: string;


  constructor(private service: KnowledgeCenterService, private router: Router) { }

  ngOnInit() {
    this.service.loadCategories().subscribe(categories => this.categories = categories);
  }

  submit() {
    this.service.addQuestion(this.question, this.title, this.categorySelected).subscribe(
      () => this.router.navigate(["/home/knc"])
    );
  }

}
