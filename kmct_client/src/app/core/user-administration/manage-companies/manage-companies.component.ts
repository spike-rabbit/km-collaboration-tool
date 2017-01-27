import {Component, OnInit, HostBinding} from "@angular/core";
import {Router} from "@angular/router";
import {Company} from "../../../../../../kmct_server/models/data-types";
import {UserAdministrationService} from "../user-administration.service";
import {slideInOutAnimation} from "../../router-animations";

@Component({
  selector: 'app-manage-companies',
  templateUrl: './manage-companies.component.html',
  styleUrls: ['./manage-companies.component.css'],
  animations: [slideInOutAnimation]
})
export class ManageCompaniesComponent implements OnInit {
  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display') display = 'block';
  @HostBinding('style.position') position = 'absolute';
  companies: Company[];

  constructor(private router: Router, private uasService: UserAdministrationService) {
  }

  ngOnInit() {
    this.uasService.loadCompanies().subscribe(companies => {
      this.companies = companies;
      for (let c of companies) {
        this.uasService.loadCompanyLogo(c.id).subscribe(logoBlob => c.logo = logoBlob);
      }
    });
  }

  onClick(company: Company): void {
    this.router.navigate(['/home/uas/manage-companies/edit', company.id]);
  }
}
