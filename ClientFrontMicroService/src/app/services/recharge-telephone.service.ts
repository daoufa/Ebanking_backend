import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class RechargeTelephoneService {
  public host: string = "http://localhost:8080/comptes/";

  constructor(private httpClient: HttpClient) {}

  // public getRechargeTelephonesPage(page: number, size: number) {
  //   return this.httpClient.get(this.host);
  // }

  public getRechargeTelephones(numCpt) {
    let jwtToken = localStorage.getItem("token");

    return this.httpClient.get(this.host + numCpt + "/rechargeTelephones", {
      headers: new HttpHeaders({ Authorization: jwtToken }),
    });
  }

  public SaveRecharge(data) {
    let jwtToken = localStorage.getItem("token");

    return this.httpClient.post(
      "http://localhost:8080/rechargeTelephones",
      data,
      { headers: new HttpHeaders({ Authorization: jwtToken }) }
    );
  }
}
