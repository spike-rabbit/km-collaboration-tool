import {Component, OnInit, HostBinding} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {slideInOutAnimation} from "../../router-animations";
import {UserAdministrationService} from "../user-administration.service";
import {FileUploader, FileUploaderOptions} from "ng2-file-upload";
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
  name: string;
  logoUpload: FileUploader;


  constructor(private route: ActivatedRoute, private uasService: UserAdministrationService, private router: Router) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['company'];
      if (this.id) {
        this.uasService.loadCompany(this.id).subscribe(company => {
          this.id = company.id;
          this.name = company.name;
        });
      }
      this.logoUpload = new KmctFileUpload({
        url: base_url + "/api/uas/company/" + this.id + "/logo",
        method: "POST",
        headers: [{
          name: "authentication-token",
          value: gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().id_token
        }],
      }, () => {
        this.router.navigate(["/home/uas/manage-companies"]);
      });
    });
  }

  onSubmit() {
    if (this.id) {
      this.uasService.saveCompany({id: this.id, name: this.name}).subscribe(company => {
        if (this.logoUpload.queue.length == 1)
          this.logoUpload.uploadAll();
        else {
          this.router.navigate(["/home/uas/manage-companies"]);
        }
      });
    } else {
      this.uasService.createCompany({name: this.name}).subscribe(company => {
        this.logoUpload.setOptions({
          url: base_url + "/api/uas/company/" + company.id + "/logo",
          method: "POST",
          headers: [{
            name: "authentication-token",
            value: gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().id_token
          }],
        });
        this.logoUpload.options.url = base_url + "/api/uas/company/" + company.id + "/logo";
        if (this.logoUpload.queue.length == 1)
          this.logoUpload.uploadAll();
        else {
          this.router.navigate(["/home/uas/manage-companies"])
        }
      });
    }
  }
}

class KmctFileUpload extends FileUploader {


  constructor(options: FileUploaderOptions, private callback: () => void) {
    super(options);
  }

  onCompleteAll(): any {
    this.callback();
    return super.onCompleteAll();
  }
}
