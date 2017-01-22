import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullCalenderComponent } from './full-calender/full-calender.component';
import { SmallCalenderComponent } from './small-calender/small-calender.component';
import { EditEventComponent } from './edit-event/edit-event.component';
import {DatepickerModule} from "ng2-bootstrap";
import {FormsModule} from "@angular/forms";
import {SharedEventManagementService} from "./shared-event-management.service";

@NgModule({
  imports: [
    CommonModule,
    DatepickerModule.forRoot(),
    FormsModule
  ],
  exports: [FullCalenderComponent, SmallCalenderComponent],
  declarations: [FullCalenderComponent, SmallCalenderComponent, EditEventComponent],
  providers: [SharedEventManagementService]
})
export class SharedEventManagementModule { }
