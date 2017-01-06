import { Injectable } from '@angular/core';
import {SigninStateService} from "../signin-state.service";
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";

@Injectable()
export class AdminGuardService implements CanActivate{

  constructor(private signInService: SigninStateService) { }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|Promise<boolean>|boolean {
    return this.signInService.user.isUserInRole("ADMIN");
  }
}
