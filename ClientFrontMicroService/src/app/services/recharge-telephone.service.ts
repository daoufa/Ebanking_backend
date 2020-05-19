import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

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
    return this.httpClient.get(this.host + numCpt + "/rechargeTelephones");
  }

  public SaveRecharge(data) {
    console.log(data);
    return this.httpClient.post(
      "http://localhost:8080/rechargeTelephones",
      data
    );
  }
}
