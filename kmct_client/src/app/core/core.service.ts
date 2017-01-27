import {Injectable} from "@angular/core";
import {KmctHttpService} from "../global-services/kmct-http.service";
import {Observable} from "rxjs";
import {Response} from "@angular/http";

@Injectable()
export class CoreService {

  constructor(private http: KmctHttpService){}

  loadNotifications() {
    return this.http.get("/api/nds/notifications", {sendAuthToken: true})
      .map(res => res.json().notifications)
      .catch((response: Response) => {
      console.log(response);
      return Observable.throw("Error");
    });
  }

  deleteNotification(id: number) {
    return this.http.delete("/api/nds/notification/" + id, {sendAuthToken: true})
      .catch((response: Response) => {
        console.log(response);
        return Observable.throw("Error");
      });
  }

}
