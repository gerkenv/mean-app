import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: String;
  username: String;
  email: String;
  password: String;

  constructor(private _validateService: ValidateService,
              private _flashMessagesService: FlashMessagesService) { }

  ngOnInit() {
  }

  onRegisterSubmit() {

  // create object from <form> <input>s
  const user = {
    name: this.name,
    username: this.username,
    email: this.email,
    password: this.password
  }

  // validate all required fields
  if (!this._validateService.validateRegister(user)) {
    this._flashMessagesService.show("Please fill up all fields",
                                    {cssClass: 'alert-danger', timeout: 3000});
    return false;
  }

  // validate email
  if (!this._validateService.validateEmail(user.email)) {
    this._flashMessagesService.show("Please provide a correct email",
                                    {cssClass: 'alert-danger', timeout: 3000});
    return false;
  }

    return true;
  }

}
