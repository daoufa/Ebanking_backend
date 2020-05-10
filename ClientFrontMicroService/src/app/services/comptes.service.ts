import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Compte } from "../model/compte.model";
import { map } from "rxjs/operators";
import { stringify } from "querystring";

@Injectable({
  providedIn: "root",
})
export class ComptesService {
  comptes;

  private host = "http://localhost:8080/clients/1/comptes/";

  constructor(private httpClient: HttpClient) {}

  getComptesByClientId(numclient:number) {
    return this.httpClient.get(
      "http://localhost:8080/clients/" + numclient + "/comptes"
    );
  }

  getCompte(numCpt) {
    return this.httpClient.get(this.host + numCpt.numero);
  }

}
