import { Injectable } from '@angular/core';
import {Ausbildungsnachweis} from "./ausbildungsnachweis";

@Injectable()
export class XchangeCenterService {

  //ID ist "Primärschlüssel", bei Ausbildungsnachweis anzeigen wird Array[ID-1] angezeigt
  ausbildungsnachweise = [
  new Ausbildungsnachweis(1, 1, '02.01.17 - 06.01.17', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag',false),
  new Ausbildungsnachweis(2, 2, '09.01.17 - 13.01.17', 'Montag2', 'Dienstag2', 'Mittwoch2', 'Donnerstag2', 'Freitag2', false),
  new Ausbildungsnachweis(3, 3, '16.01.17 - 20.01.17', 'Montag3', 'Dienstag3', 'Mittwoch3', 'Donnerstag3', 'Freitag3', false)
  ];

  constructor() { }

}
