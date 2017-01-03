import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {XchangeCenterComponent} from "./xchange-center.component";
import {RouterModule} from "@angular/router";
import { AusbildungsnachweisComponent } from './ausbildungsnachweis/ausbildungsnachweis.component';
import { AusbildungsnachweisEditorComponent } from './ausbildungsnachweis-editor/ausbildungsnachweis-editor.component';
import { ListeAusbildungsnachweisComponent } from './listeAusbildungsnachweise.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [XchangeCenterComponent, AusbildungsnachweisComponent, AusbildungsnachweisEditorComponent]
})
export class XchangeCenterModule {
}
