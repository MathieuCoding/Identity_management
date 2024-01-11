import { Injectable } from '@angular/core';
import {HttpHeaders} from "@angular/common/http";
import {Observable, of, tap} from "rxjs";

interface AuthenticationResponse {
  status: boolean;
  token: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  redirectUrl = '/';
  constructor() { }

  static isLoggedIn() {
    const token = AuthenticationService.getToken();
    console.log('token=' + token);
    return !!token && !AuthenticationService.isTokenExpired(token);
  }

  static isTokenExpired(token: string) {
    // Le vrai code
    // try {
    //   const decoded = jwt_decode(token);
    //   return decoded.exp < Date.now() / 1000;
    // } catch (e) {
    //   return false;
    // }
    // La simulation
    return false;
  }

  static setToken(idToken: string) {
    // Saves user token to sessionStorage
    sessionStorage.setItem('id_token', idToken);
  }

  static getToken() {
    // Retrieves the user token from sessionStorage
    return sessionStorage.getItem('id_token');
  }

  static logout() {
    // Clear user token and profile data from sessionStorage
    sessionStorage.removeItem('id_token');
  }

  loginWithRole(username: any, password: any, role: any): Observable<AuthenticationResponse> {
    // Le vrai code
    // const url = `${this.authenticationUrl}/login`;
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'application/json',
    //   })
    // };
    //
    // return this.httpClient.request<AuthenticationResponse>('POST', url, {
    //   body: {
    //     username,
    //     password,
    //     role
    //   },
    //   headers: httpOptions.headers
    // }).pipe(
    //   tap((data: AuthenticationResponse) => AuthenticationService.setToken((data.token))
    //     //Setting the token in sessionStorage
    //   )
    // );

    // La simulation
    const response: AuthenticationResponse = {status: true, message: 'HTTP 200', token: 'atoken'};
    AuthenticationService.setToken('token');
    return of(response);
  }
}
