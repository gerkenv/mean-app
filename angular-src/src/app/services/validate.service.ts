import { Injectable } from '@angular/core';

@Injectable()
export class ValidateService {

  constructor() { }

  validateRegister(user) {
    if ((this.validateString(user.name) === false)
    || (this.validateString(user.username) === false)
    || (this.validateString(user.email) === false)
    || (this.validateString(user.password) === false)) {
      return false;
    }
    return true;
  }

  validateString(str) {
    if ((str === undefined)
    || (str === null)
    || (str === '')) {
        return false;
    }
    return true;
  }

  validateLogin(user) {
    if ((user.name === undefined)
    ||  (user.password === undefined)) {
      return false;
    }
    return true;
  }

  validateEmail(email) {
    const re = /^[\w-.]+@[\w-]+.[\w-.]+/;
    return re.test(email);
  }

}
