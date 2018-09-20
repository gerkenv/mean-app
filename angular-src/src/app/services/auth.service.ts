import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
  authToken: any;
  user: any;


  constructor(private _http: Http) { }

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

  storeUserData(jwt, user) {
    // store token and user data
    localStorage.setItem('id_token', jwt);
    // local storage can only store strings
    localStorage.setItem('user', JSON.stringify(user));
    // set current token and user
    this.authToken = jwt;
    this.user = user;
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}
