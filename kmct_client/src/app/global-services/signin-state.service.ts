import {Injectable, NgZone} from "@angular/core";
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild} from "@angular/router";
import {Observable} from "rxjs";
import {UrlStoreService} from "./url-store.service";
import {User} from "../../data-definitions";
import {Response, Http, Headers} from "@angular/http";
import {base_url} from "../../environments/environment";

@Injectable()
export class SigninStateService implements CanActivate, CanActivateChild {
  private isSigningIn = false;
  public user: Observable<User>;
  public unsafeUser: User;

  constructor(private urlStore: UrlStoreService, private router: Router, private http: Http, private ngZone: NgZone) {
    let callBackStack: ((value, error) => void)[] = [];
    this.user = Observable.bindNodeCallback(callback => {
      if (this.unsafeUser)
        callback(null, this.unsafeUser);
      else if (this.isSigningIn) {
        callBackStack.push(callback);
      } else {
        this.isSigningIn = true;
        this.signIn().subscribe(user => {
          this.unsafeUser = new User(user.firstname, user.name, user.roles.map(role => role.id), gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().id_token, user.company_id, user.workinghours);
          callback(null, this.unsafeUser);
          callBackStack.forEach(cb => cb(null, this.unsafeUser));
        }, error => {
          callback(error, null);
        });
      }
    })();
  }


  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.canActivate(childRoute, state);
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.user.map(user => {
      if (user)
        return true;
      else
        this.urlStore.storedUrl = state.url;
      this.router.navigate(["/login"]);
    });
  }

  private signIn() {
    if (gapi.auth2 && gapi.auth2.getAuthInstance()) {
      return this.fetchUser();
    } else {
      return Observable.bindNodeCallback((callback => {
        gapi.load("auth2", () => {
          gapi.auth2.init({}).then(() => {
            this.ngZone.run(() => {
              callback(null, null)
            });
          }, error => {
            console.log(error);
            callback(error, null)
          });
        });
      }))().switchMap(() => {
        return this.fetchUser();
      });
    }
  }

  private fetchUser() {
    let headers = new Headers();
    //TODO refresh auth-token if required
    headers.set("authentication-token", gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().id_token);
    return this.http.get(base_url + "/api/user", {headers: headers}).map(val => {
      return val.json();
    }).map(user => {
      return user;
    });
  }

  processRegister(idToken: string, uuid: string) {
    return this.http.post(base_url + "/api/user", {
      uuid: uuid,
      authenticationToken: idToken
    }).map(res => res.json()).subscribe(user => {
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
}
