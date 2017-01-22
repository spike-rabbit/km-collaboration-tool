import {Injectable, EventEmitter} from "@angular/core";
import {Observable} from "rxjs";
import {Response} from "@angular/http";
import {KmctHttpService} from "../../global-services/kmct-http.service";
import * as moment from "moment";

@Injectable()
export class SharedEventManagementService {

  reloadAppointments: EventEmitter<void> = new EventEmitter<void>(false);

  constructor(private http: KmctHttpService) {
  }

  loadAppointments() {
    return this.http.get("/api/sem/appointments", {sendAuthToken: true}).map(res => res.json()).map(apps => apps.appointments).catch((response: Response) => {
        console.log(response);
        return Observable.throw("Error");
      }
    );
  }

  loadAppointment(id: number) {
    return this.http.get("/api/sem/appointment/" + id, {sendAuthToken: true}).map(res => res.json()).catch((response: Response) => {
        console.log(response);
        return Observable.throw("Error");
      }
    );
  }

  addAppointment(name: string, description: string, startDate: string, startTime: string, endDate: string, endTime: string, repetitionType: string, repetitionCount: number) {
    let start = moment(startDate + "-" + startTime, "YYYY-MM-DD-HH:mm").toISOString();
    let end = moment(endDate + "-" + endTime, "YYYY-MM-DD-HH:mm").toISOString();
    return this.http.post("/api/sem/appointment", {
      appointment: {
        name: name,
        description: description,
        start: start,
        end: end,
        repetitionType: repetitionType,
        repetitionCount: repetitionCount
      }
    }, {sendAuthToken: true}).map(appointment => {
      this.reloadAppointments.emit();
      return appointment;
    }).catch((response: Response) => {
        console.log(response);
        return Observable.throw("Error");
      }
    );
  }

  updateAppointment(id: number, name: string, description: string, startDate: string, startTime: string, endDate: string, endTime: string, repetitionType: string, repetitionCount: number) {
    let start = moment(startDate + "-" + startTime, "YYYY-MM-DD-HH:mm").toISOString();
    let end = moment(endDate + "-" + endTime, "YYYY-MM-DD-HH:mm").toISOString();
    return this.http.put("/api/sem/appointment/" + id, {
      appointment: {
        name: name,
        description: description,
        start: start,
        end: end,
        repetitionType: repetitionType,
        repetitionCount: repetitionCount
      }
    }, {sendAuthToken: true}).map(empty => {
      this.reloadAppointments.emit();
      return empty;
    }).catch((response: Response) => {
        console.log(response);
        return Observable.throw("Error");
      }
    );
  }

  deleteAppointment(id: number) {
    return this.http.delete("/api/sem/appointment/" + id, {sendAuthToken: true}).map(none => {
      this.reloadAppointments.emit();
      return none;
    }).catch((response: Response) => {
        console.log(response);
        return Observable.throw("Error");
      }
    );
  }


}
