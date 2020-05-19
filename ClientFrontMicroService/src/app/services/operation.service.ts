import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Client} from '../model/client.model';
import {HttpClient} from '@angular/common/http';
import {Virement} from '../model/virement.model';
import {HttpHeaders} from '@angular/common/http';
import {AuthenticationService} from "./authentication.service";
@Injectable({
  providedIn: 'root'
})
export class OperationService {
  public host = 'http://localhost:8080/operations';
  // @ts-ignore
  constructor(private httpClient: HttpClient, private authService: AuthenticationService , ) {}
  public getOperations( ) {
    return this.httpClient.get(this.host);
  }

  public getVirementById(id: number ) {
    return this.httpClient.get('http://localhost:8080/virements/'+id);
  }

  public getOperationByCompteId(cpteid: number ) {

    let jwtToken=localStorage.getItem('token');
    return this.httpClient.get('http://localhost:8080/comptes/' + cpteid + '/virements');
  }

  public getVirementsByCompteId(cpteid: number ) {
    let jwtToken=localStorage.getItem('token');
    return this.httpClient.get('http://localhost:8080/comptes/' + cpteid + '/virements',{headers:new HttpHeaders({'Authorization':jwtToken})});
  }
  public deleteResource(url ) {

    return this.httpClient.delete(url);
  }

  public save(data): Observable<Virement> {
    // @ts-ignore

    return this.httpClient.post('http://localhost:8080/virements', data);
  }

  public getResource(url): Observable<Virement> {
    // @ts-ignore
    return this.httpClient.get(url);
  }

  public updateResource(data)  {
    // @ts-ignore
    return this.httpClient.put(this.host, data);
  }


}
