import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
// user: String;
// username: String;
// email: String;
// password: String;
user: object;

  constructor(
    private _authService: AuthService,
    private _router: Router
  ) { }

  ngOnInit() {
    this._authService.getProfile().subscribe(profile => {
      this.user = profile.user;
      // this.username = profile.username;
      // this.email = profile.email;
      // this.password = profile.password;
    },
    err => {
      console.log(err);
      return false;
    }
  );
  }

}
