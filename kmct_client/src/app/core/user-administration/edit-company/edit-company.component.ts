import {Component, OnInit, HostBinding} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {Company} from "../../../../../../kmct_server/models/data-types";
import {FileUploader} from "ng2-file-upload";
import {base_url} from "../../../../environments/environment";
import {slideInOutAnimation} from "../../router-animations";

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

  companies: Company[] = [{id: 1, name: "Siemens"}, {id: 2, name: "Atos"}, {id: 3, name: "First Data"}, {
    id: 4,
    name: "S&N"
  }];
  id: number;
  company: Company;

  logoUploader: FileUploader;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['company'];
    // this.logoUploader = new FileUploader({
    //   url: base_url + "/api/uas/company/" + this.id + "/logo",
    //   method: "POST",
    //   autoUpload: true,
    //   headers: [{
    //     name: "authentication-token",
    //     value: gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().id_token
    //   }],
    // });
    this.company = this.companies[this.id - 1];
  }

  onSubmit() {
  }


}
