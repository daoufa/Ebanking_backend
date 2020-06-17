import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Client } from "../model/client";
import {exhaustMap, take} from "rxjs/operators";
import {AuthenticationService} from "./authentication.service";

@Injectable({
  providedIn: "root",
})
export class ClientService {
  public host: string = "http://localhost:8080/clients/";
  // @ts-ignore
  constructor(private httpClient: HttpClient,private authService:AuthenticationService) {}

  public getClients(page: number, size: number) {
   // let jwtToken = localStorage.getItem("token");

    return this.httpClient.get(this.host/*, {
      headers: new HttpHeaders({ Authorization: jwtToken }),
    }*/);
  }
  /* public getProductsByKeyword(mc:string,page:number,size:number ){

    return this.httpClient.get(this.host+"/search/byDesignationPage?mc="+mc+"&page="+page+"&size="+size);
  }
*/





  public update(data) {
    // @ts-ignore
    return this.httpClient.put(this.host, data);
  }

  public getClient(clientid) {
    // @ts-ignore

    // let jwtToken=localStorage.getItem('token');
    return this.authService.user.pipe(take(1),exhaustMap(user=>{
      return this.httpClient.get(
        this.host + clientid
        ,{headers:new HttpHeaders({'Authorization':user.token})}
      );
    }));

  }
}
