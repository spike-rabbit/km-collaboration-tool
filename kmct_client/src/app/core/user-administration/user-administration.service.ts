import {Injectable} from "@angular/core";
import {KmctHttpService} from "../../global-services/kmct-http.service";
import {Observable} from "rxjs";
import {Response, ResponseContentType} from "@angular/http";
import {ROLES} from "../../../../../kmct_server/models/data-types";
import {DomSanitizer} from "@angular/platform-browser";

@Injectable()
export class UserAdministrationService {

  constructor(private http: KmctHttpService, private sanatizer: DomSanitizer) {
  }

  deleteInvitation(uuid: string) {
    // TODO catch errors
    return this.http.delete("/api/uas/invitation/" + uuid, {sendAuthToken: true}).catch((response: Response) => {
      console.log(response);
      return Observable.throw("Error");
    });
  }

  addInvitation(invitation: any) {
    // TODO catch errors
    return this.http.post("/api/uas/invitation", {invitation: invitation}, {sendAuthToken: true}).map(res => {
      let invitation = res.json().invitation;
      return UserAdministrationService.addLink(invitation);
    }).catch((response: Response) => {
        console.log(response);
        return Observable.throw("Error");
      }
    );
  }

  applyUserChanges(name: string, firstname: string) {
    return this.http.patch("/api/user", {
      user: {
        name: name,
        firstname: firstname
      }
    }, {sendAuthToken: true}).map(res => res.json()).catch((response: Response) => {
        console.log(response);
        return Observable.throw("Error");
      }
    );
  }

  loadInvitations() {
    // TODO catch errors
    return this.http.get("/api/uas/invitations", {sendAuthToken: true}).map(res => res.json().invitations.map(UserAdministrationService.addLink)).catch((response: Response) => {
      console.log(response);
      return Observable.throw("Error");
    });
  }

  loadClassMembers() {
    // TODO catch errors
    return this.http.get("/api/uas/class-members", {sendAuthToken: true}).map(res => res.json().classMembers.map(member => {
      return {name: member.name, firstname: member.firstname, email: member.email};
    }));
  }

  loadClasses() {
    return this.http.get("/api/uas/classes", {sendAuthToken: true}).map(res => res.json().classes.map(classwi => {
      if (classwi.uuid) {
        return UserAdministrationService.addLink(classwi);
      } else {
        classwi.link = "TODO Klasse Aktiv";
        return classwi;
      }
    }));
  }

  addClass(className: string, classLeaderName: string, classLeaderFirstname: string, classLeaderEmail: string) {
    return this.http.post("/api/uas/class", {class: {id: className}}, {sendAuthToken: true}).switchMap(classResponse => {
      return this.addInvitation({
        name: classLeaderName,
        firstname: classLeaderFirstname,
        email: classLeaderEmail,
        targetRole: ROLES.ksspr,
        classId: className
      });
    });
  }

  loadCompanies() {
    return this.http.get("/api/uas/companies", {sendAuthToken: true}).map(res => res.json().companies);
  }

  loadCompanyLogo(id: number) {
    return this.http.get("/api/uas/company/" + id + "/logo", {
      sendAuthToken: true,
      responseType: ResponseContentType.Blob
    }).map(res => res.blob()).map(blob => this.sanatizer.bypassSecurityTrustUrl(window.URL.createObjectURL(blob)));
  }

  saveCompany(company: any) {
    return this.http.put("/api/uas/company/" + company.id, company, {sendAuthToken: true});
  }

  createCompany(company: any) {
    return this.http.post("/api/uas/company/", company, {sendAuthToken: true});
  }

  private static addLink(invitation: any) {
    invitation.link = window.location.origin + "/login;invitation=" + invitation.uuid;
    return invitation;
  }

}
