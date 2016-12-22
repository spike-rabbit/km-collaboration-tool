import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.css']
})
export class CoreComponent implements OnInit {

  constructor(private router : Router) { }

  ngOnInit() {

  }

  isActive(route : string) : boolean  {
    return this.router.isActive(route, false);
  }

}
