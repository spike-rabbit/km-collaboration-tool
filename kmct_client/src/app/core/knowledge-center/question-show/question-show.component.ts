import {Component, OnInit, HostBinding} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {Question} from "../question";
import {slideInOutAnimation} from "../../router-animations";
import {KnowledgeCenterService} from "../knowledge-center.service";
import {Answer} from "../answer";
import {SigninStateService} from "../../../global-services/signin-state.service";

@Component({
  selector: 'app-question-show',
  templateUrl: './question-show.component.html',
  styleUrls: ['./question-show.component.css'],
  animations: [slideInOutAnimation]
})
export class QuestionShowComponent implements OnInit {
  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display') display = 'block';
  @HostBinding('style.position') position = 'absolute';

  question: Question;
  id: number;
  answer: string;

  constructor(private route: ActivatedRoute, private kncService: KnowledgeCenterService, private signInService: SigninStateService) {
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['question'];
    this.kncService.loadQuestion(this.id).subscribe(question => this.question = question);
  }

  onLike(answer: Answer) {
    this.kncService.likeAnswer(answer).subscribe(() => {
      answer.likeCount++;
      answer.liked = true;
    });
  }

  submit() {
    this.kncService.addAnswer(this.question.id, this.answer).subscribe(answer => {
     this.question.answers.push({answer: this.answer, likeCount: 0, liked: true, user: this.signInService.unsafeUser});
     this.answer = "";
    });

  }

}
