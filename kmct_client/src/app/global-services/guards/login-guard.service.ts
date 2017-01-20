import {Injectable} from "@angular/core";
import {SigninStateService} from "../signin-state.service";
import {CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot} from "@angular/router";
import {Observable} from "rxjs";

@Injectable()
export class LoginGuardService implements CanActivate {

  constructor(private signInService: SigninStateService) {
  }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|Promise<boolean>|boolean {
    // let ssGuard = this.signInService.canActivate(route, state);
    // if (ssGuard instanceof Observable) {
    //   return ssGuard.map(value => !value);
    // } else {
    //   return !ssGuard;
    // }
    // TODO
    return true;
  }
}
