import { Injectable } from '@angular/core';
import {Journal} from "./journal";
import {KmctHttpService} from "../../global-services/kmct-http.service";
import {Response} from "@angular/http";
import {Observable} from "rxjs";

@Injectable()
export class XchangeCenterService {

  journals: Journal[];

  constructor(private http: KmctHttpService) { }

  loadJournals() {
    return this.http.get("/api/xcc/journals", {sendAuthToken: true})
      .map(res => res.json().journals)
      .catch((response: Response) => {
        console.log(response);
        return Observable.throw("Error");
      }
    );
  }

}
