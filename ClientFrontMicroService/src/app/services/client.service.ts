import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Client } from "../model/client.model";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class ClientService {
  public host: string = "http://localhost:8080/clients";
  // @ts-ignore
  constructor(private httpClient: HttpClient) {}
  public getClients(page: number, size: number) {
    return this.httpClient.get(this.host);
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

  public getClient(clientid): Observable<Client> {
    // @ts-ignore
    return this.httpClient.get("//localhost:8080/clients/" + clientid);
  }
}
