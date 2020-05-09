import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { AuthenticationService } from "../services/authentication.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent {
  username: string;
  password: string;
  errorMessage = "Invalid Credentials";
  successMessage: string;
  invalidLogin = false;
  loginSuccess = false;
  credentials = { username: "", password: "" };

  constructor(
    private authenticationService: AuthenticationService,
    private http: HttpClient,
    private router: Router
  ) {}

  login() {
    this.authenticationService
      .authenticationService(this.username, this.password)
      .subscribe(
        (result) => {
          this.invalidLogin = false;
          this.loginSuccess = true;
          this.successMessage = "Login Successful.";
          this.router.navigate(["/home"]);
        },
        () => {
          this.invalidLogin = true;
          this.loginSuccess = false;
        }
      );
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
