import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, map, tap} from 'rxjs/operators';
import { throwError, BehaviorSubject} from "rxjs";
import {User} from "../user/user";
import {UserService} from "./user.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {

  public username: String;
  public password: String;
  private host = 'http://localhost:8080';
  user = new BehaviorSubject<User>(null);


  constructor(private http: HttpClient,private userService: UserService,private router:Router) {}




  login(user) {
    var id:number;
   return this.http.post(this.host + '/login', user, {observe: 'response'})
     .pipe(
       catchError(this.handleError),tap(resData=>{

      this.userService.getUsersId(user.username).subscribe((data) => {

          var x = data['clientCode'];

          id = +x;
          const userRes=new User(user.username,id,user.password,resData.headers.get('Authorization'));

  this.user.next(userRes);
          localStorage.setItem('userData',JSON.stringify(userRes));
        },
        (err) => {
          console.log(err);
        });

       }));
  }

  autoLogin(){
    const userData=JSON.parse(localStorage.getItem('userData'));

    if(!userData) return;

    const loadedUser = new User(
      userData.code,
      userData.id,
      userData.password,
      userData._token);
    if(loadedUser.token){
      this.user.next(loadedUser);
    }

  }

  logout(){
    localStorage.removeItem('userData');
    this.user.next(null);
    this.router.navigate(['/login']);
  }

  private handleError(errorRes:HttpErrorResponse){
    let errorMessage= 'cet utilisateur n\'existe pas!!';
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



}
