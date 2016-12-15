import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {base_url} from "../environments/environment";
import {Observable} from "rxjs";

@Injectable()
export class LoginService {

  constructor(private http: Http) {
  }

  testLogin(token: any) {
    return this.http.post(base_url + "/login", {token: token}).map(res => res.text()).catch(this.handleError);
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
