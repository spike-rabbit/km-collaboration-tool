import {Component, OnInit, HostBinding} from '@angular/core';
import {slideInOutAnimation} from "../../router-animations";

@Component({
  selector: 'app-ausbildungsnachweis-editor',
  templateUrl: './ausbildungsnachweis-editor.component.html',
  styleUrls: ['./ausbildungsnachweis-editor.component.css'],
  animations: [slideInOutAnimation]
})
export class AusbildungsnachweisEditorComponent implements OnInit {
  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display')   display = 'block';
  @HostBinding('style.position')  position = 'absolute';
  constructor() { }

  ngOnInit() {
  }

}
