import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Compte } from '../model/compte.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ComptesService {

  private host = "http://localhost:8080/comptes/";

  constructor(private httpClient : HttpClient) { }

  getCompte(numCpt : number) {
    console.log(numCpt);
    return this.httpClient.get(this.host+numCpt);
  }
}
