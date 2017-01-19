import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-manage-companies',
  templateUrl: './manage-companies.component.html',
  styleUrls: ['./manage-companies.component.css']
})
export class ManageCompaniesComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onClick(company: string): void {
//    this.router.navigate(['/home/xcc/journal', name]);
   this.router.navigate(['/home/uas/manage-companies/edit', company]);



  }

}
