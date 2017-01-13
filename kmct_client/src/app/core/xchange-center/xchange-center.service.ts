import { Injectable } from '@angular/core';
import {Ausbildungsnachweis} from "./ausbildungsnachweis";
import {KmctHttpService} from "../../global-services/kmct-http.service";
import {Response} from "@angular/http";
import {Observable} from "rxjs";

@Injectable()
export class XchangeCenterService {

  constructor(private http: KmctHttpService) { }

  loadJournals() {
    return this.http.get("/api/xcc/journals", {sendAuthToken: true})
      .map(res => res.json().ausbildungsnachweise)
      .catch((response: Response) => {
        console.log(response);
        return Observable.throw("Error");
      }
    );
  }

}
