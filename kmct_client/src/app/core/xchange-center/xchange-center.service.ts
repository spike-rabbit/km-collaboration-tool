import { Injectable } from '@angular/core';
import {Ausbildungsnachweis} from "./ausbildungsnachweis";

@Injectable()
export class XchangeCenterService {

  ausbildungsnachweise = [
  new Ausbildungsnachweis(1, 1, '12.1.17'),
  new Ausbildungsnachweis(2, 2, '23.1.17'),
  new Ausbildungsnachweis(3, 3, '15.2.17')
]

  constructor() { }

}
