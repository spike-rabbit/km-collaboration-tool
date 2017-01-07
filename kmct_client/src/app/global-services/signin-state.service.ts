import {Injectable} from "@angular/core";
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from "@angular/router";
import {Observable} from "rxjs";
import {UrlStoreService} from "./url-store.service";
import {KmctHttpService} from "./kmct-http.service";
import {User} from "../../data-definitions";
import {Response} from "@angular/http";

@Injectable()
export class SigninStateService implements CanActivate {

  isSignedIn = false;

  idToken: string;

  user: User;

  constructor(private urlStore: UrlStoreService, private router: Router, private http: KmctHttpService) {
  }

  processSignIn(idToken: string, uuid: string) {
    this.idToken = idToken;
    this.http.get("/api/user", {sendAuthToken: true}).map(val => {
      return val.json();
    }).catch((error: Response) => {
      if (error.status = 404) {
        return this.http.post("/api/user", {uuid: uuid, authenticationToken: idToken}).map(res => res.json());
      } else {
        return Observable.throw(`${error.status} - ${error.statusText || ''}`);
      }
    }).subscribe(user => {
      this.user = new User(user.firstname, user.name, user.roles.map(role => role.id));
      this.isSignedIn = true;
      let url = this.urlStore.storedUrl;
      if (!url || url && url.match(".*login.*")) {
        this.router.navigate(['/home/']);
      } else {
        this.router.navigate([url]);
      }
    }, (error: Response) => {
      //TODO show message, log better
      console.log(error);
    });
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|Promise<boolean>|boolean {
    if (!this.isSignedIn) {
      this.urlStore.storedUrl = state.url;
      this.router.navigate(['/login']);
    }
    return this.isSignedIn;
  }
}
