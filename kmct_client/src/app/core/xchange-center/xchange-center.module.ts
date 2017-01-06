import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {XchangeCenterComponent} from "./xchange-center.component";
import {RouterModule} from "@angular/router";
import { AusbildungsnachweisComponent } from './ausbildungsnachweis/ausbildungsnachweis.component';
import { AusbildungsnachweisEditorComponent } from './ausbildungsnachweis-editor/ausbildungsnachweis-editor.component';
import { ListeAusbildungsnachweiseComponent } from './liste-ausbildungsnachweise/liste-ausbildungsnachweise.component';
import {XchangeCenterService} from "./xchange-center.service";
import {FormsModule} from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  declarations: [XchangeCenterComponent, AusbildungsnachweisComponent, AusbildungsnachweisEditorComponent, ListeAusbildungsnachweiseComponent],
  providers: [XchangeCenterService]
})
export class XchangeCenterModule {
}
