import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {Company} from "../../../../../../kmct_server/models/data-types";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-edit-company',
  templateUrl: './edit-company.component.html',
  styleUrls: ['./edit-company.component.css']
})
export class EditCompanyComponent implements OnInit {

  companies: Company[] = [{id:1,name:"Siemens"}, {id:2,name:"Atos"}, {id:3,name:"First Data"}, {id:4,name:"S&N"}];
  id:number;
  company:Company;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['company'];
    this.company = this.companies[this.id-1];
  }

}
