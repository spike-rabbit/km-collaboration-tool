import {Injectable} from "@angular/core";
import {KmctHttpService} from "../../global-services/kmct-http.service";
import {Response} from "@angular/http";
import {Observable} from "rxjs";
import {Journal} from "./journal";

@Injectable()
export class XchangeCenterService {

  constructor(private http: KmctHttpService) {
  }

  loadJournals() {
    return this.http.get("/api/xcc/journals", {sendAuthToken: true})
      .map(res => res.json().journals)
      .catch((response: Response) => {
          console.log(response);
          return Observable.throw("Error");
        }
      );
  }

  loadJournal(id: number) {
    return this.http.get("/api/xcc/journal/" + id, {sendAuthToken: true})
      .map(res => res.json().journal)
      .catch((response: Response) => {
        console.log(response);
        return Observable.throw("Error");
      });
  }

  patchJournal(journal: Journal) {
    return this.http.patch("/api/xcc/journal/" + journal.id, journal, {sendAuthToken: true}).catch((response: Response) => {
      console.log(response);
      return Observable.throw("Error");
    });
  }

  setActivated(id: number) {
    return this.http.patch("/api/xcc/journal/" + id, {activated: true}, {sendAuthToken: true})
      .catch((response: Response) => {
        console.log(response);
        return Observable.throw("Error");
      });
  }

}
