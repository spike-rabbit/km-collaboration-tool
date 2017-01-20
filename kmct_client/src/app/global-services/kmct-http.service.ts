import {Injectable} from "@angular/core";
import {Http, Headers, RequestOptionsArgs, Response} from "@angular/http";
import {KmctRequestOptions} from "../../data-definitions";
import {base_url} from "../../environments/environment";
import {Observable} from "rxjs";
import {SigninStateService} from "./signin-state.service";

@Injectable()
export class KmctHttpService {

  constructor(private http: Http, private signInService: SigninStateService) {
  }

  get(url: string, requestOptions?: KmctRequestOptions): Observable<Response> {
    return this.http.get(KmctHttpService.appendURL(url), this.createRequestOptionsArgs(requestOptions));
  }

  post(url: string, body: any, requestOptions?: KmctRequestOptions): Observable<Response> {
    return this.http.post(KmctHttpService.appendURL(url), body, this.createRequestOptionsArgs(requestOptions));
  }

  delete(url: string, requestOptions?: KmctRequestOptions): Observable<Response> {
    return this.http.delete(KmctHttpService.appendURL(url), this.createRequestOptionsArgs(requestOptions));
  }

  patch(url: string, body :any, requestOptions?: KmctRequestOptions): Observable<Response> {
    return this.http.patch(KmctHttpService.appendURL(url), body, this.createRequestOptionsArgs(requestOptions));
  }

  // Implement all http-methods similar to get

  private static appendURL(url: string) {
    return base_url + url;
  }

  private createRequestOptionsArgs(requestOptions?: KmctRequestOptions): RequestOptionsArgs {
    if (requestOptions) {
      let headers: Headers;
      if (requestOptions.sendAuthToken) {
        headers = new Headers();

        headers.set("authentication-token", this.signInService.user.idToken);
        if (requestOptions.headers) {
          requestOptions.headers.forEach((values, name) => headers.set(name, values));
        }
      } else if (requestOptions.headers) {
        headers = requestOptions.headers;
      }
      return {search: requestOptions.search, headers: headers};
    }
  }

}
