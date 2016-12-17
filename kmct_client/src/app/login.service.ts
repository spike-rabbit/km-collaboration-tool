import {Injectable} from "@angular/core";
import {Http, Response, Headers} from "@angular/http";
import {base_url} from "../environments/environment";
import {Observable} from "rxjs";
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {UrlStoreService} from "./global-services/url-store.service";

@Injectable()
export class LoginService implements CanActivate {

  constructor(private http: Http, private urlStore : UrlStoreService) {
  }

  private isSignedInd = false;

  testLogin(token: any) {
    let headers = new Headers();
    this.isSignedInd = true;
    return this.http.post(base_url + "/login", {token: token}).map(res => res.text()).catch(this.handleError);
  }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|Promise<boolean>|boolean {
    this.urlStore.storedUrl = state.url;
    return true;
  }

  private handleError(error: Response | any) {
    console.log(error);
    //In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(error);
    return Observable.throw(errMsg);
  }

}
