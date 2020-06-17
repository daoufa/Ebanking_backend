import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {exhaustMap, take} from "rxjs/operators";
import {AuthenticationService} from "./authentication.service";

@Injectable({
  providedIn: "root",
})
export class RechargeTelephoneService {
  public host: string = "http://localhost:8080/comptes/";

  constructor(private httpClient: HttpClient, private authService: AuthenticationService ) {}

  // public getRechargeTelephonesPage(page: number, size: number) {
  //   return this.httpClient.get(this.host);
  // }

  public getRechargeTelephones(numCpt) {
    return this.authService.user.pipe(take(1),exhaustMap(user=>{
      return this.httpClient.get(
        this.host + numCpt + "/rechargeTelephones"
        ,{headers:new HttpHeaders({'Authorization':user.token})}
      );
    }));


  }



  public SaveRecharge(data) {
    // let jwtToken = localStorage.getItem("token");
    return this.authService.user.pipe(take(1),exhaustMap(user=>{
      return this.httpClient.post(
        "http://localhost:8080/saveRecharge",data
        ,{headers:new HttpHeaders({'Authorization':user.token})}
      );
    }));
   
  }
}
