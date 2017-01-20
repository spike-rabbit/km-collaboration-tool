import {Injectable} from "@angular/core";
import {SigninStateService} from "../signin-state.service";
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {ROLES} from "../../../../../kmct_server/models/data-types";

@Injectable()
export class UserGuardService implements CanActivate {

  constructor(private signInService: SigninStateService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|Promise<boolean>|boolean {
    return this.signInService.user.map(user => user.isUserInRole(ROLES.ksmem));
  }
}
