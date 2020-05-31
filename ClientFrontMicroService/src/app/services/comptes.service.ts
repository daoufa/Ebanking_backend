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

  private host = "http://localhost:8083/comptes/";

  constructor(private httpClient: HttpClient) {}

  getComptesByClientId(numclient: number) {
    // let jwtToken=localStorage.getItem('token');

    return this.httpClient.get(
      "http://localhost:8083/clients/" + numclient + "/comptes"
      // {headers:new HttpHeaders({'Authorization':jwtToken})}
    );
  }
  getComptesByOperationId(numOperation: number) {
    return this.httpClient.get("http://localhost:8083/operations/1/compte");
  }
   getCompte(numCpt) {
    return this.httpClient.get("http://localhost:8083/comptes/" + numCpt);
  }
}
