import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {catchError, map, tap} from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { throwError, BehaviorSubject} from "rxjs";
import {User} from "../user/user";
import {UserService} from "./user.service";
import {Client} from "../model/client";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser';

  public username: String;
  public password: String;
  private jwtToken: string;
  private roles: Array<any> = [];
  private host = 'http://localhost:8080';
  user = new BehaviorSubject<User>(null);


  constructor(private http: HttpClient,private userService: UserService,private router:Router) {}

  authenticationService(username: String, password: String) {
    return this.http
      .get(`http://localhost:8083/auth`, {
        headers: {
          authorization: this.createBasicAuthToken(username, password),
        },
      })
      .pipe(
        map((res) => {
          this.username = username;
          this.password = password;
          this.registerSuccessfulLogin(username, password);
        })
      );
  }


  login(user) {
    var id:number;
   return this.http.post(this.host + '/login', user, {observe: 'response'})
     .pipe(
       catchError(this.handleError),tap(resData=>{
       //  const expirationDate=new Date();

      this.userService.getUsersId(user.username).subscribe((data) => {

          var x = data['code'];
          id = +x;
          const userRes=new User(user.username,id,user.password,resData.headers.get('Authorization'));

          this.user.next(userRes);
        },
        (err) => {
          console.log(err);
        });

       }));
  }

  logout(){
    this.user.next(null);
    this.router.navigate(['/login']);
  }

  private handleError(errorRes:HttpErrorResponse){
    let errorMessage= 'An unkonwn error occured!!';
    if(!errorRes.message){
      return throwError(errorMessage);
    }

    switch (errorRes.message) {
      case 'Http failure response for http://localhost:8080/login: 0 Unknown Error':
        errorMessage='Connection Error! verify your connection and try again.';
        break;

      case 'invalid password':
        errorMessage='This password is incorrect!';
        break;

    }

    return throwError(errorMessage);
  }

  saveToken(jwtToken) {
    this.jwtToken = jwtToken;
    localStorage.setItem ('token', jwtToken);
    const jwtHelper = new JwtHelperService();
    this.roles = jwtHelper.decodeToken(this.jwtToken).roles;

  }

  loadToken() {

    this.jwtToken = localStorage.getItem('token');
  }
  getComptes(){
    if(this.jwtToken==null ) this.loadToken();
    return this.http.get( this.host+"/virements",{ headers:new
    HttpHeaders({'Authorization':this.jwtToken})});
  }

  createBasicAuthToken(username: String, password: String) {
    return 'Basic ' + window.btoa(username + ':' + password);
  }

  registerSuccessfulLogin(username, password) {
    sessionStorage.setItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME, username);
  }



  isUserLoggedIn() {
    const user = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
    if (user === null) { return false; }
    return true;
  }

  getLoggedInUserName() {
    const user = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
    if (user === null) { return ''; }
    return user;
  }
}
