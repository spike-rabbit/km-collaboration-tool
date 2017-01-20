import {Injectable} from "@angular/core";
import {SigninStateService} from "../signin-state.service";
import {CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot, Router} from "@angular/router";
import {Observable} from "rxjs";

@Injectable()
export class LoginGuardService implements CanActivate {

  constructor(private signInService: SigninStateService, private router: Router) {
  }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|Promise<boolean>|boolean {
    return this.signInService.canActivate(route, state).map(signedIn => {
      if (signedIn) {
        this.router.navigate(["/home"]);
        return false;
      }
      else
        return true;
    });
  }
}
