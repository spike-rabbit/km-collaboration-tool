import {Injectable} from "@angular/core";
import {Http, Headers, RequestOptionsArgs, Response} from "@angular/http";
import {KmctRequestOptions} from "../../data-definitions";
import {base_url} from "../../environments/environment";
import {Observable} from "rxjs";

@Injectable()
export class KmctHttpService {

  constructor(private http: Http) {
  }

  get(url: string, requestOptions?: KmctRequestOptions): Observable<Response> {
    return this.http.get(KmctHttpService.appendURL(url), this.createRequestOptionsArgs(requestOptions));
  }

  post(url: string, body: any, requestOptions?: KmctRequestOptions): Observable<Response> {
    return this.http.post(KmctHttpService.appendURL(url), body, this.createRequestOptionsArgs(requestOptions));
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
        //TODO refresh auth-token if required
        headers.set("authentication-token", gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().id_token);
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
