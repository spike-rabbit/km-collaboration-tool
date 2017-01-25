import {Injectable} from "@angular/core";
import {Question} from "./question";
import {Category} from "./category";
import {Response} from "@angular/http";
import {Observable} from "rxjs";
import {KmctHttpService} from "../../global-services/kmct-http.service";

@Injectable()
export class KnowledgeCenterService {

  // categories: Category[] = [{category: "ITM", id: 1}, {category: "Organisatorisches: Studium", id: 2}];
  //
  // questions: Question[] = [{
  //   id: 234,
  //   category: this.categories[0],
  //   title: "Wie geht was?",
  //   owner: "Paula",
  //   answers: [{id:1, votes:1, answer:"Das ist meine Antwort. Das ist meine Antwort. Das ist meine Antwort. Das ist meine Antwort. " +
  //   "Das ist meine Antwort. Das ist meine Antwort. Das ist meine Antwort. Das ist meine Antwort. Das ist meine Antwort. " +
  //   "Das ist meine Antwort. Das ist meine Antwort. Das ist meine Antwort. Das ist meine Antwort."},
  //     {id:2, votes:4, answer:"Das ist meine Antwort. Das ist meine Antwort. Das ist meine Antwort. Das ist meine Antwort. " +
  //     "Das ist meine Antwort. Das ist meine Antwort. Das ist meine Antwort. Das ist meine Antwort. Das ist meine Antwort. " +
  //     "Das ist meine Antwort. Das ist meine Antwort. Das ist meine Antwort. Das ist meine Antwort."}],
  //   question: "Das ist meine Frage. Das ist meine Frage. Das ist meine Frage. Das ist meine Frage. Das ist meine Frage. Das ist meine Frage. " +
  //   "Das ist meine Frage. Das ist meine Frage. Das ist meine Frage. Das ist meine Frage. Das ist meine Frage. Das ist meine Frage. "
  // }];


  constructor(private http: KmctHttpService) {
  }

  loadQuestions() {
    return this.http.get("/api/knc/threads", {sendAuthToken: true})
      .map(res => res.json().threads)
      .catch((response: Response) => {
          console.log(response);
          return Observable.throw("Error");
        }
      );
  }

  loadQuestion(id: number) {
    return this.http.get("/api/knc/thread/" + id, {sendAuthToken: true})
      .map(res => res.json().thread)
      .catch((response: Response) => {
        console.log(response);
        return Observable.throw("Error");
      });
  }

}
