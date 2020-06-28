import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../services/authentication.service';
import {FormGroup, NgForm} from '@angular/forms';
import {AppComponent} from '../app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username: string;
  password: string;
  errorMessage : string = null;
  successMessage: string;
  invalidLogin = false;
  loginSuccess = false;
  isLoading:boolean=false;

  credentials = { username: '', password: '' };

  constructor(
    private authenticationService: AuthenticationService,
    private http: HttpClient,
    private router: Router
  ) {}

  login(form: NgForm) {


    if(!form.valid){
      return;
    }
    const code=form.value.username
    const password=form.value.password;
  this.isLoading=true;
    this.authenticationService
      .login(form.value)
      .subscribe(
        (result) => {
          console.log(result);

          this.router.navigate(["/home"]);
        },
        (err) => {
          this.isLoading=false;
          this.errorMessage=err;
          console.log(err);
        }
      );

    form.reset();
  }


  saveToken(jwtToken: string) {
    localStorage.setItem('token', jwtToken);
  }


}
