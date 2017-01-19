import {Component, OnInit} from "@angular/core";
import {KnowledgeCenterService} from "../knowledge-center.service";
import {Router} from "@angular/router";
import {Question} from "../question";

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css']
})
export class QuestionListComponent implements OnInit {
  questions: Question[];

  onSelect(question: Question): void {
    this.router.navigate(['/home/knc/show-question', question.id]);
  }

  constructor(private router: Router, private service: KnowledgeCenterService) {
  }

  ngOnInit() {
    this.questions = this.service.questions;
  }

}
