import {Injectable} from "@angular/core";
import {KmctHttpService} from "../../global-services/kmct-http.service";
import {Observable} from "rxjs";
import {Response} from "@angular/http";

@Injectable()
export class UserAdministrationService {

  constructor(private http: KmctHttpService) {
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
      return this.addLink(invitation);
    }).catch((response: Response) => {
        console.log(response);
        return Observable.throw(
          "Error"
        );
      }
    )
      ;
  }

  loadInvitations() {
    // TODO catch errors
    return this.http.get("/api/uas/invitations", {sendAuthToken: true}).map(res => res.json().invitations.map(this.addLink)).catch((response: Response) => {
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

  private addLink(invitation: any) {
    invitation.link = window.location.origin + "/login;invitation=" + invitation.uuid;
    return invitation;
  }

}
