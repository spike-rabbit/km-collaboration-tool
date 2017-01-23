import {Component, OnInit} from "@angular/core";
import * as moment from "moment";
import {ActivatedRoute, Router} from "@angular/router";
import {SharedEventManagementService} from "../shared-event-management.service";
import {UrlStoreService} from "../../../global-services/url-store.service";

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.css']
})
export class EditEventComponent implements OnInit {

  constructor(private route: ActivatedRoute, private semService: SharedEventManagementService, private router: Router, private urlStore: UrlStoreService) {
  }

  id: number;
  name: string;
  description: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  repetitionType: string = "none";
  repetitionCount: number;
  type: string;

  ngOnInit() {
    this.startDate = moment(new Date()).format("YYYY-MM-DD");
    this.endDate = moment(new Date()).format("YYYY-MM-DD");
    this.route.params.subscribe(params => {
      if (params["id"] != this.id) {
        this.id = params["id"];
        if (!this.id) {
          this.startDate = moment(new Date()).format("YYYY-MM-DD");
          this.endDate = moment(new Date()).format("YYYY-MM-DD");
        } else {
          this.semService.loadAppointment(this.id).subscribe(event => {
            this.name = event.name;
            this.description = event.description;
            let start = moment(event.start);
            this.startDate = start.format("YYYY-MM-DD");
            this.startTime = start.format("HH:mm");
            let end = moment(event.end);
            this.endDate = end.format("YYYY-MM-DD");
            this.endTime = end.format("HH:mm");
            this.repetitionType = event.repetitionType;
            this.repetitionCount = event.repetitionCount;
            this.type = event.type;
          });
        }
      }
    });

  }

  onSubmit() {
    if (this.id) {
      this.semService.updateAppointment(this.id, this.name, this.description, this.startDate, this.startTime, this.endDate, this.endTime, this.repetitionType, this.repetitionCount, this.type).subscribe(res => {
        this.onCancel();
      });
    }
    else {
      this.semService.addAppointment(this.name, this.description, this.startDate, this.startTime, this.endDate, this.endTime, this.repetitionType, this.repetitionCount, this.type).subscribe(res => {
        this.onCancel();
      });
    }
  }

  onCancel() {
    if (this.urlStore.storedUrl)
      this.router.navigate([this.urlStore.storedUrl]);
    else
      this.router.navigate(["/home"]);
  }

  onDelete() {
    if (this.id) {
      this.semService.deleteAppointment(this.id).subscribe(res => {
        this.onCancel();
      });
    }
  }

}
