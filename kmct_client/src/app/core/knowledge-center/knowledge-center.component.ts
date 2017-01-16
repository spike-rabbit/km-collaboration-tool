import {Component, OnInit, HostBinding} from "@angular/core";
import {Question} from "./question";
import {Router} from "@angular/router";
import {slideInOutAnimation} from "../router-animations";
import {KnowledgeCenterService} from "./knowledge-center.service";

@Component({
  selector: 'app-knowledge-center',
  templateUrl: './knowledge-center.component.html',
  styleUrls: ['./knowledge-center.component.css'],
  animations: [slideInOutAnimation]
})
export class KnowledgeCenterComponent implements OnInit {
  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display') display = 'block';
  @HostBinding('style.position') position = 'absolute';

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
