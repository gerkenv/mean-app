import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthService {
  authToken: any;
  user: any;


  constructor(
    private _http: Http,
  ) { }

  registerUser(user) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.post(
      'http://localhost:3000/users/register',
      user,
      {headers: headers}
    ).map(res => res.json());
  }

  authenticateUser(user) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.post(
      'http://localhost:3000/users/authenticate',
      user,
      {headers: headers}
    ).map(res => res.json());
  }

  getProfile() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.loadToken());
    return this._http.get(
      'http://localhost:3000/users/profile',
      {headers: headers}
    ).map(res => res.json());
  }

  storeUserData(jwt, user) {
    // store token and user data
    localStorage.setItem('id_token', jwt);
    // local storage can only store strings
    localStorage.setItem('user', JSON.stringify(user));
    // set current token and user
    this.authToken = jwt;
    this.user = user;
  }

  loadToken() {
    const jwt = localStorage .getItem('id_token');
    this.authToken = jwt;
    return jwt;
  }

  loggedIn() {
    return tokenNotExpired('id_token');
    // can be also used without an argument, but then token has to
    // be saved in local storage with key `token`.
    // return tokenNotExpired();
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}
