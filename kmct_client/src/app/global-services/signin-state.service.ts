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

  idToken : string;

  user : User;

  constructor(private urlStore: UrlStoreService, private router: Router, private http: KmctHttpService) {
  }

  processSignIn(idToken: string) {
    this.idToken = idToken;
    this.http.get("/user", {sendAuthToken: true}).map(val => {return val.json();}).catch((error: Response) => {
      if(error.status = 404) {
        // TODO Use invitation Param
        return Observable.throw("Sollte später nicht mehr zwangsläufig vorkommen");
      } else {

      }
      return Observable.throw(`${error.status} - ${error.statusText || ''}`);
    }).subscribe(user => {

    }, (error: Response) => {

    });
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|Promise<boolean>|boolean {
    if (!this.isSignedIn) {
      this.urlStore.storedUrl = state.url;
      this.router.navigate(['/']);
    }
    return this.isSignedIn;
  }
}
