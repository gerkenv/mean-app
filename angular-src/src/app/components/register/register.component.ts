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

  constructor(private validateService: ValidateService,
              private flashMessageService: FlashMessagesService) { }

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
    if (!this.validateService.validateRegister(user)) {
      console.log("Please fill up all fields.");
      return false;
    }

    // validate email
    if (!this.validateService.validateEmail(user.email)) {
      console.log("Please provide a correct email.");
      return false;
    }
    
    return true;
  }

}
