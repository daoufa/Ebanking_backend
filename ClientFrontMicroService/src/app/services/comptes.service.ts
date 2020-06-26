import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import {exhaustMap, map, take} from "rxjs/operators";
import { stringify } from "querystring";
import {AuthenticationService} from "./authentication.service";

@Injectable({
  providedIn: "root",
})
export class ComptesService {
  comptes;

  private host = "http://localhost:8080/comptes/";

  constructor(private httpClient: HttpClient, private authService : AuthenticationService) {}

  getComptesByClientId(numclient: number) {
    return this.authService.user.pipe(take(1),exhaustMap(user=>{
      return this.httpClient.get(
        "http://localhost:8080/clients/" + numclient + "/comptes"
        ,{headers:new HttpHeaders({'Authorization':user.token})}
      );
    }));


  }
  getComptesByOperationId(numOperation: number) {
    return this.httpClient.get("http://localhost:8080/operations/1/compte");
  }

  /* getCompte(numCpt) {
    return this.httpClient.get("http://localhost:8080/comptes/" + numCpt);*/

   getCompte(numCpt,clientId) {
     return this.authService.user.pipe(take(1),exhaustMap(user=>{
       return this.httpClient.get("http://localhost:8080/clients/"+clientId+"/comptes/" + numCpt
         ,{headers:new HttpHeaders({'Authorization':user.token})}
       );
     }));

  }
  getCurrentAccount(numCpt) {

    return this.authService.user.pipe(take(1),exhaustMap(user=>{
      return this.httpClient.get(this.host + numCpt
        ,{headers:new HttpHeaders({'Authorization':user.token})}
      );
    }));

  }
}
