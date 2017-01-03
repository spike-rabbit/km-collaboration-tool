import {Injectable} from "@angular/core";
import {KmctHttpService} from "../../global-services/kmct-http.service";
import {Observable} from "rxjs";
import {Response} from "@angular/http";

@Injectable()
export class UserAdministrationService {

  constructor(private http: KmctHttpService) {
  }

  loadInvitations() {
    // TODO catch errors
    return this.http.get("/api/uas/invitations", {sendAuthToken: true}).map(res => res.json().invitations.map(invitation => {
      return {
        link: window.location.origin + "/" + invitation.uuid,
        name: invitation.name,
        firstname: invitation.firstname,
        email: invitation.email
      };
    })).catch((response: Response) => {
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

}
