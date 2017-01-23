import {Injectable, EventEmitter} from "@angular/core";
import {Observable} from "rxjs";
import {Response} from "@angular/http";
import {KmctHttpService} from "../../global-services/kmct-http.service";
import * as moment from "moment";

@Injectable()
export class SharedEventManagementService {

  reloadAppointments: EventEmitter<void> = new EventEmitter<void>(false);
  private eventColorMapping = {
    SPE: "#005f69",
    ATIW: "blue",
    STANDARD: "black",
    EXAM: "red",
    LECTURE: "green"
  };


  constructor(private http: KmctHttpService) {
  }

  loadAppointments() {
    return this.http.get("/api/sem/appointments", {sendAuthToken: true}).map(res => res.json())
      .map(apps => apps.appointments.map(appointment => {
        appointment.color = this.eventColorMapping[appointment.type];
        return appointment;
      }))
      .catch((response: Response) => {
          console.log(response);
          return Observable.throw("Error");
        }
      );
  }

  loadAppointmentsWithCallback(callback: any) {
    this.loadAppointments().subscribe(appointments => {
      if (appointments)
        callback(appointments.map(app => {
          return {
            id: app.id,
            title: app.name,
            start: app.start.toString(),
            end: app.end.toString(),
            color: app.color
          };
        }));
    });
  }

  loadAppointment(id: number) {
    return this.http.get("/api/sem/appointment/" + id, {sendAuthToken: true}).map(res => res.json()).catch((response: Response) => {
        console.log(response);
        return Observable.throw("Error");
      }
    );
  }

  addAppointment(name: string, description: string, startDate: string, startTime: string, endDate: string, endTime: string, repetitionType: string, repetitionCount: number, type: string) {
    let start = moment(startDate + "-" + startTime, "YYYY-MM-DD-HH:mm").toISOString();
    let end = moment(endDate + "-" + endTime, "YYYY-MM-DD-HH:mm").toISOString();
    return this.http.post("/api/sem/appointment", {
      appointment: {
        name: name,
        description: description,
        start: start,
        end: end,
        repetitionType: repetitionType,
        repetitionCount: repetitionCount,
        type: type

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

  updateAppointment(id: number, name: string, description: string, startDate: string, startTime: string, endDate: string, endTime: string, repetitionType: string, repetitionCount: number, type: string) {
    let start = moment(startDate + "-" + startTime, "YYYY-MM-DD-HH:mm").toISOString();
    let end = moment(endDate + "-" + endTime, "YYYY-MM-DD-HH:mm").toISOString();
    return this.http.put("/api/sem/appointment/" + id, {
      appointment: {
        name: name,
        description: description,
        start: start,
        end: end,
        repetitionType: repetitionType,
        repetitionCount: repetitionCount,
        type: type
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
