import {URLSearchParams, Headers, ResponseContentType} from "@angular/http";
/**
 * Created by Maxi- PC on 16.12.2016.
 */
export interface KmctRequestOptions {
  search?: string | URLSearchParams;
  headers?: Headers;
  sendAuthToken?: boolean;
  responseType?: ResponseContentType
}

export class User {

  constructor(public firstname: string, public name: string, private roles: string[], public idToken: string) {
  }

  isUserInRole(role: string) {
    return this.roles.indexOf(role) >= 0;
  }
}

