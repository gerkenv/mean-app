import { Injectable } from '@angular/core';

@Injectable()
export class ValidateService {

  constructor() { }

  validateRegister(user) {
    if ((user.name == undefined) 
    || (user.username == undefined) 
    || (user.email == undefined) 
    || (user.password == undefined)) {
      return false;
    }
    return true;
  }
  
  validateEmail(email) {
    const re = /^[\w-.]+@[\w-]+.[\w-.]+/;
    return re.test(email);
  }

}
