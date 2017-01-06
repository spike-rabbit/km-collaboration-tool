import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Ausbildungsnachweis } from '../ausbildungsnachweis';

@Component({
  selector: 'app-ausbildungsnachweis',
  templateUrl: './ausbildungsnachweis.component.html',
  styleUrls: ['./ausbildungsnachweis.component.css']
})
export class AusbildungsnachweisComponent implements OnInit {

  nachweis: Ausbildungsnachweis;

  constructor(private route: ActivatedRoute) {
    this.nachweis = route.snapshot.params['ausbildungsnachweis'];
  }

  ngOnInit() {
  }

}
