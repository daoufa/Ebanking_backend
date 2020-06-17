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
         /* let jwtToken =result.headers.get('Authorization');
          this.authenticationService.saveToken(jwtToken);
          this.invalidLogin = false;
          this.loginSuccess = true;
          this.successMessage = "Login Successful.";*/
          this.router.navigate(["/home"]);
        },
        (err) => {
          this.errorMessage=err;
          console.log(err);
         // this.invalidLogin = true;
        //  this.loginSuccess = false;
        }
      );

    form.reset();
  }


  saveToken(jwtToken: string) {
    localStorage.setItem('token', jwtToken);
  }

  // constructor(
  //   private authService: AuthenticationService,
  //   private router: Router
  // ) {}

  // ngOnInit(): void {}

  // onLogin(dataForm: any) {
  //   this.authService.login(dataForm.username, dataForm.password);
  //   if (this.authService.isAuthenticated) {
  //     this.authService.saveAuthenticatedUser();
  //     this.router.navigateByUrl("/home");
  //   }
  // }
}
