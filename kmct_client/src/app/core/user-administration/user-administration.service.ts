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

  applyUserChanges(name: string, firstname: string, companyId: number, workinghours: number) {
    return this.http.patch("/api/user", {
      user: {
        name: name,
        firstname: firstname,
        companyId: companyId,
        workinghours: workinghours
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
      return {
        id: member.id,
        name: member.name,
        firstname: member.firstname,
        email: member.email,
        knc: member.roles.some(role => role.id == ROLES.knc),
        xcc: member.roles.some(role => role.id == ROLES.xcc)
      };
    })).catch((response: Response) => {
      console.log(response);
      return Observable.throw("Error");
    });
  }

  loadClasses() {
    return this.http.get("/api/uas/classes", {sendAuthToken: true}).map(res => res.json().classes.map(classwi => {
      if (classwi.uuid) {
        return UserAdministrationService.addLink(classwi);
      } else {
        classwi.link = "TODO Klasse Aktiv";
        return classwi;
      }
    })).catch((response: Response) => {
      console.log(response);
      return Observable.throw("Error");
    });
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
    }).catch((response: Response) => {
      console.log(response);
      return Observable.throw("Error");
    });
  }

  loadCompanies() {
    return this.http.get("/api/uas/companies", {sendAuthToken: true}).map(res => res.json().companies).catch((response: Response) => {
      console.log(response);
      return Observable.throw("Error");
    });
  }

  loadCompany(id: number) {
    return this.http.get("/api/uas/company/" + id).map(res => res.json().company).catch((response: Response) => {
      console.log(response);
      return Observable.throw("Error");
    });
  }

  loadCompanyLogo(id: number) {
    return this.http.get("/api/uas/company/" + id + "/logo", {
      sendAuthToken: true,
      responseType: ResponseContentType.Blob
    }).map(res => res.blob()).map(blob => this.sanatizer.bypassSecurityTrustUrl(window.URL.createObjectURL(blob))).catch((response: Response) => {
      return Observable.empty();
    });
  }

  saveCompany(company: any) {
    return this.http.post("/api/uas/company/" + company.id, company, {sendAuthToken: true}).catch((response: Response) => {
      console.log(response);
      return Observable.throw("Error");
    });
  }

  createCompany(company: any) {
    return this.http.post("/api/uas/company/", company, {sendAuthToken: true}).map(res => res.json()).catch((response: Response) => {
      console.log(response);
      return Observable.throw("Error");
    });
  }

  addRole(userId: number, role: string) {
    return this.http.patch("/api/user/" + userId + "/role/" + role, {}, {sendAuthToken: true}).catch((response: Response) => {
      console.log(response);
      return Observable.throw("Error");
    });
  }

  removeRole(userId: number, role: string) {
    return this.http.delete("/api/user/" + userId + "/role/" + role, {sendAuthToken: true}).catch((response: Response) => {
      console.log(response);
      return Observable.throw("Error");
    });
  }

  loadUsers() {
    return this.http.get("/api/users", {sendAuthToken: true}).map(res => res.json().users).map(users => users.map(user => {
      user.class = user.class_id; return user;
    })).catch((response: Response) => {
      console.log(response);
      return Observable.throw("Error");
    });
  }

  deleteUser(userId: number) {
    return this.http.delete("/api/user/" + userId, {sendAuthToken: true})
      .catch((response: Response) => {
      console.log(response);
      return Observable.throw("Error");
    });
  }

  private static addLink(invitation: any) {
    invitation.link = window.location.origin + "/login;invitation=" + invitation.uuid;
    return invitation;
  }

}
