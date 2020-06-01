import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Client } from "../model/client";

@Injectable({
  providedIn: "root",
})
export class ClientService {
  public host: string = "http://localhost:8080/clients/";
  // @ts-ignore
  constructor(private httpClient: HttpClient) {}

  public getClients(page: number, size: number) {
    let jwtToken = localStorage.getItem("token");

    return this.httpClient.get(this.host, {
      headers: new HttpHeaders({ Authorization: jwtToken }),
    });
  }
  /* public getProductsByKeyword(mc:string,page:number,size:number ){

    return this.httpClient.get(this.host+"/search/byDesignationPage?mc="+mc+"&page="+page+"&size="+size);
  }
*/
  public deleteResource(url) {
    return this.httpClient.delete(url);
  }

  public save(data): Observable<Client> {
    // @ts-ignore
    return this.httpClient.post(this.host, data);
  }

  public getResource(url): Observable<Client> {
    // @ts-ignore
    return this.httpClient.get(url);
  }

  public updateResource(data) {
    // @ts-ignore
    return this.httpClient.put(this.host, data);
  }

  public getClient(clientid) {
    // @ts-ignore

    // let jwtToken=localStorage.getItem('token');

    return this.httpClient.get(
      this.host + clientid
      // ,{headers:new HttpHeaders({'Authorization':jwtToken})}
    );
  }
}
