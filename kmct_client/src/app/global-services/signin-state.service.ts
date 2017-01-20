import {Injectable} from "@angular/core";
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from "@angular/router";
import {Observable} from "rxjs";
import {UrlStoreService} from "./url-store.service";
import {User} from "../../data-definitions";
import {Response, Http, Headers} from "@angular/http";
import {base_url} from "../../environments/environment";

@Injectable()
export class SigninStateService implements CanActivate {

  isSignedIn = false;
  user: User;

  constructor(private urlStore: UrlStoreService, private router: Router, private http: Http) {
  }


  processSignIn(idToken: string, uuid?: string) {
    let headers = new Headers();
    //TODO refresh auth-token if required
    headers.set("authentication-token", gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().id_token);
    this.http.get("/api/user", {headers: headers}).map(val => {
      return val.json();
    }).catch((error: Response) => {
      if (error.status = 404) {
        return this.http.post(base_url + "/api/user", {
          uuid: uuid,
          authenticationToken: idToken
        }).map(res => res.json());
      } else {
        return Observable.throw(`${error.status} - ${error.statusText || ''}`);
      }
    }).subscribe(user => {
      this.user = new User(user.firstname, user.name, user.roles.map(role => role.id), gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().id_token);
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
      if (gapi.auth2 && gapi.auth2.getAuthInstance()) {
        return this.fetchUser(state);
      } else {
        return Observable.bindNodeCallback((callback => {
          gapi.load("auth2", () => {
            gapi.auth2.init({}).then(() => {
              console.log(gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().id_token);
              callback(null, null)
            }, error => {
              console.log(error);
              callback(error, null)
            });
          });
        }))().switchMap(() => {
          return this.fetchUser(state);
        });
      }
    } else {
      return this.isSignedIn;
    }
  }

  private fetchUser(state: RouterStateSnapshot) {
    let headers = new Headers();
    //TODO refresh auth-token if required
    headers.set("authentication-token", gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().id_token);
    return this.http.get(base_url + "/api/user", {headers: headers}).map(val => {
      return val.json();
    }).map(user => {
      this.user = new User(user.firstname, user.name, user.roles.map(role => role.id), gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().id_token);
      this.isSignedIn = true;
      if (state.url.match(".*login.*")) {
        this.router.navigate(["/home"]);
      }
      return true;
    }).catch((error: Response) => {
      if (error.status == 404) {
        this.urlStore.storedUrl = state.url;
        this.router.navigate(["/login"]);
        return Observable.of(false);
      } else {
        console.log(JSON.stringify(error));
        return Observable.throw(`${error.status} - ${error.statusText || ''}`);
      }
    });
  }
}
