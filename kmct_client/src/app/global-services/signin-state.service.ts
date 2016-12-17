import {Injectable} from "@angular/core";
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from "@angular/router";
import {Observable} from "rxjs";
import {UrlStoreService} from "./url-store.service";

@Injectable()
export class SigninStateService implements CanActivate {

  isSignedIn = false;

  constructor(private urlStore: UrlStoreService, private router: Router) {
  }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|Promise<boolean>|boolean {
    if (!this.isSignedIn) {
      this.urlStore.storedUrl = state.url;
      this.router.navigate(['/']);
    }
    return this.isSignedIn;
  }
}
