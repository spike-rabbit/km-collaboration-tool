import {Component, OnInit, HostBinding} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {Company} from "../../../../../../kmct_server/models/data-types";
import {slideInOutAnimation} from "../../router-animations";
import {UserAdministrationService} from "../user-administration.service";
import {FileUploader} from "ng2-file-upload";
import {base_url} from "../../../../environments/environment";

@Component({
  selector: 'app-edit-company',
  templateUrl: './edit-company.component.html',
  styleUrls: ['./edit-company.component.css'],
  animations: [slideInOutAnimation]
})
export class EditCompanyComponent implements OnInit {
  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display') display = 'block';
  @HostBinding('style.position') position = 'absolute';

  id: number;
  company: Company;
  logoUpload: FileUploader;


  constructor(private route: ActivatedRoute, private uasService: UserAdministrationService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['company'];
      this.uasService.loadCompany(this.id).subscribe(company => {
        this.company = company;
        this.logoUpload = new FileUploader({
          url: base_url + "/api/uas/company/" + this.id + "/logo",
          method: "POST",
          autoUpload: true,
          headers: [{
            name: "authentication-token",
            value: gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().id_token
          }],
        });
      });
    });
  }

  onSubmit() {

    console.log("submitted");
  }


}
