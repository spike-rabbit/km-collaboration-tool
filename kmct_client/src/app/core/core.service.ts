import {Injectable} from "@angular/core";
import {KmctHttpService} from "../global-services/kmct-http.service";
import {Observable} from "rxjs";
import {Response} from "@angular/http";

@Injectable()
export class CoreService {

  constructor(private http: KmctHttpService) {
  }

  loadAppointments() {
    return this.http.get("/api/sem/appointments", {sendAuthToken: true}).map(res => res.json()).map(apps => apps.appointments).catch((response: Response) => {
        console.log(response);
        return Observable.throw("Error");
      }
    );
  }

}
