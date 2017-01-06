import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Ausbildungsnachweis } from '../ausbildungsnachweis';
import {XchangeCenterService} from "../xchange-center.service";

@Component({
  selector: 'app-ausbildungsnachweis',
  templateUrl: './ausbildungsnachweis.component.html',
  styleUrls: ['./ausbildungsnachweis.component.css']
})
export class AusbildungsnachweisComponent implements OnInit {

  nachweis: Ausbildungsnachweis;
  id: number;

  constructor(private route: ActivatedRoute, private xccService: XchangeCenterService) {
    this.id = route.snapshot.params['ausbildungsnachweis'];
    this.nachweis = this.xccService.ausbildungsnachweise[this.id - 1];
  }

  ngOnInit() {
  }

}
