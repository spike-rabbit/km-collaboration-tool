import {Component, OnInit, HostBinding} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Question} from "../question";
import {KnowledgeCenterComponent} from "../knowledge-center.component";
import {slideInOutAnimation} from "../../router-animations";

@Component({
  selector: 'app-question-show',
  templateUrl: './question-show.component.html',
  styleUrls: ['./question-show.component.css'],
  animations: [slideInOutAnimation]
})
export class QuestionShowComponent implements OnInit {
  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display')   display = 'block';
  @HostBinding('style.position')  position = 'absolute';

  question: Question;
  id: number;

  constructor(private route: ActivatedRoute, private knowledgeCenterComponent: KnowledgeCenterComponent) {
    //this.id = route.snapshot.params['question'];
    //this.question = this.knowledgeCenterComponent.questions[this.id - 1];
  }

  ngOnInit() {
  }

}
