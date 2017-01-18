import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {XchangeCenterComponent} from "./xchange-center.component";
import {RouterModule} from "@angular/router";
import { JournalComponent } from './journal/journal.component';
import { JournalEditorComponent } from './journal-editor/journal-editor.component';
import { JournalListComponent } from './journal-list/journal-list.component';
import {XchangeCenterService} from "./xchange-center.service";
import {FormsModule} from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  declarations: [XchangeCenterComponent, JournalComponent, JournalEditorComponent, JournalListComponent],
  exports: [JournalListComponent],
  providers: [XchangeCenterService]
})
export class XchangeCenterModule {
}
