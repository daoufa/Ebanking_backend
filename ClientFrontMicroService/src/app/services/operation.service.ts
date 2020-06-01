import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Virement } from "../model/virement.model";
import { HttpHeaders } from "@angular/common/http";
import { AuthenticationService } from "./authentication.service";
import { ComptesService } from "./comptes.service";
@Injectable({
  providedIn: "root",
})
export class OperationService {

  public host = 'http://localhost:8083/operations';

  // @ts-ignore
  constructor(
    private httpClient: HttpClient,
    private authService: AuthenticationService,
    private comptesService: ComptesService
  ) {}
  public getOperations() {
    return this.httpClient.get(this.host);
  }

  /*public getVirementById(id: number ) {
    return this.httpClient.get('http://localhost:8083/virements/'+id);
  }*/

  /*public getOperationByCompteId(cpteid: number ) {

    let jwtToken=localStorage.getItem('token');
    return this.httpClient.get('http://localhost:8083/comptes/' + cpteid + '/virementsOut');
  }*/

 /* public getVirementsByCompteId(cpteid: number ) {
    let jwtToken=localStorage.getItem('token');
    return this.httpClient.get('http://localhost:8083/comptes/' + cpteid + '/virementsOut',{headers:new HttpHeaders({'Authorization':jwtToken})});*/

  public getVirementById(id: number) {
    return this.httpClient.get("http://localhost:8083/virements/" + id);
  }

  public getOperationByCompteId(cpteid: number) {
    let jwtToken = localStorage.getItem("token");
    return this.httpClient.get(
      "http://localhost:8080/comptes/" + cpteid + "/virementsOut"
    );
  }

  public getVirementsByCompteId(cpteid: number) {
    // let jwtToken=localStorage.getItem('token');
    return this.httpClient.get(
      "http://localhost:80803/comptes/" + cpteid + "/virementsOut"
      // ,{headers:new HttpHeaders({'Authorization':jwtToken})}
    );

  }
  public deleteResource(url) {
    return this.httpClient.delete(url);
  }

  public save(data): Observable<Virement> {
    // @ts-ignore

    return this.httpClient.post('http://localhost:8083/saveVirements', data);

  }

  public getResource(url): Observable<Virement> {
    // @ts-ignore
    return this.httpClient.get(url);
  }

  public updateResource(data) {
    //@ts-ignore
    return this.httpClient.put(this.host, data);
  }
}

