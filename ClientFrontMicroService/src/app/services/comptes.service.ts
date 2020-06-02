import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { stringify } from "querystring";

@Injectable({
  providedIn: "root",
})
export class ComptesService {
  comptes;

  private host = "http://localhost:8080/comptes/";

  constructor(private httpClient: HttpClient) {}

  getComptesByClientId(numclient: number) {
    // let jwtToken=localStorage.getItem('token');

    return this.httpClient.get(
      "http://localhost:8080/clients/" + numclient + "/comptes"
      // {headers:new HttpHeaders({'Authorization':jwtToken})}
    );
  }
  getComptesByOperationId(numOperation: number) {
    return this.httpClient.get("http://localhost:8080/operations/1/compte");
  }

  /* getCompte(numCpt) {
    return this.httpClient.get("http://localhost:8083/comptes/" + numCpt);*/

   getCompte(numCpt,clientId) {
    return this.httpClient.get("http://localhost:8080/clients/"+clientId+"/comptes/" + numCpt);

  }
  getCurrentAccount(numCpt) {
    return this.httpClient.get(this.host + numCpt);
  }
}
