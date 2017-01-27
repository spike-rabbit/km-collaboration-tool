import {Injectable} from "@angular/core";
import {KmctHttpService} from "../global-services/kmct-http.service";
import {Observable} from "rxjs";
import {Response} from "@angular/http";

@Injectable()
export class CoreService {

  constructor(private http: KmctHttpService){}

  loadNotifications() {
    this.http.get("/api/nds/notifications", {sendAuthToken: true})
      .map(res => res.json().notifications)
      .catch((response: Response) => {
      console.log(response);
      return Observable.throw("Error");
    });
  }

}
