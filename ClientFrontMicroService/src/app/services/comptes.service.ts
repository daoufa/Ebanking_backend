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

  private host = "http://localhost:8080/comptes/";

  constructor(private httpClient: HttpClient) {}

  getComptes() {
    this.httpClient.get(this.host).subscribe(
      (data) => {
        this.comptes = data;
      },
      (err) => {
        console.log("getComptes Error");
      }
    );
    return this.comptes;
  }

  getCompte(numCpt) {
    return this.httpClient.get(this.host + numCpt.numero);
  }
}
