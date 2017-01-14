import {Component, OnInit, HostBinding} from '@angular/core';
import {Question} from "./question";
import {Router} from "@angular/router";
import {slideInOutAnimation} from "../router-animations";
import {Answer} from "./answer";

@Component({
  selector: 'app-knowledge-center',
  templateUrl: './knowledge-center.component.html',
  styleUrls: ['./knowledge-center.component.css'],
  animations: [slideInOutAnimation]
})
export class KnowledgeCenterComponent implements OnInit {
  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display')   display = 'block';
  @HostBinding('style.position')  position = 'absolute';


  questions: Question[] = [new Question(1,'Frage1', 'Das ist meine Frage...', 'ITM', 'Paula', [new Answer(1, 'Antwort', 2)]),
    new Question(2,'Frage2', 'Das ist meine zweite Frage...', 'Organisatorisches: Studium', 'Leon', []) ];


  onSelect(question: Question): void {
    //this.router.navigate(['/home/knc/show-question', question.id]);
  }

  constructor(private router: Router) { }

  ngOnInit() {
  }

}
