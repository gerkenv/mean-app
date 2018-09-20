import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages'
import { Router } from '@angular/router';

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

  constructor(
    private _validateService: ValidateService,
    private _flashMessagesService: FlashMessagesService,
    private _authService: AuthService,
    private _router: Router
  ) { }

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

  // register user (send data to backend)
  this._authService.registerUser(user).subscribe(data => {
    if (data.success == false) {
      this._flashMessagesService.show(
        "Your registration was failed",
        {cssClass: 'alert-danger', timeout: 3000}
      );
      this._router.navigate(['/register']);
      return false;
    } else {
      this._flashMessagesService.show(
        "You are now registered and can log in",
        {cssClass: 'alert-success', timeout: 3000}
      );
      this._router.navigate(['/login']);
    }
  });
  
    return true;
  }

}
