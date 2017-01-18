import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullCalenderComponent } from './full-calender/full-calender.component';
import { SmallCalenderComponent } from './small-calender/small-calender.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [FullCalenderComponent, SmallCalenderComponent],
  declarations: [FullCalenderComponent, SmallCalenderComponent]
})
export class SharedEventManagementModule { }
