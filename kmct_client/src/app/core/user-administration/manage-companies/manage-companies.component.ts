import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {Company} from "../../../../../../kmct_server/models/data-types";

@Component({
  selector: 'app-manage-companies',
  templateUrl: './manage-companies.component.html',
  styleUrls: ['./manage-companies.component.css']
})
export class ManageCompaniesComponent implements OnInit {
  companies: Company[] = [{id:1,name:"Siemens"}, {id:2,name:"Atos"}, {id:3,name:"First Data"}, {id:4,name:"S&N"}];

  constructor(private router: Router) { }

  ngOnInit() {
    companies => this.companies = companies;
  }

  onClick(company: Company): void {
   this.router.navigate(['/home/uas/manage-companies/edit', company.id]);
  }
}
