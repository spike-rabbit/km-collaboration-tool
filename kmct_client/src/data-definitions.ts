import {URLSearchParams, Headers} from "@angular/http";
/**
 * Created by Maxi- PC on 16.12.2016.
 */
export interface KmctRequestOptions {
  search?: string | URLSearchParams;
  headers?: Headers;
  sendAuthToken?: boolean;
}

export class User {

  constructor(public firstname: string, public name: string, private roles: string[], public idToken: string) {
  }

  isUserInRole(role: string) {
    return this.roles.indexOf(role) >= 0;
  }
}

export interface Ausbildungsnachweis {
  mondayDate: Date;
  createdBy : string;
  isMine : string[];
  monday?: string[];
  tuesday?: string[];
  wednesday?: string[];
  thursday?: string[];
  friday?: string[];
}
