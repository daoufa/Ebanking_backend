import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Client} from '../model/client.model';
import {HttpClient} from '@angular/common/http';
import {Virement} from '../model/virement.model';

@Injectable({
  providedIn: 'root'
})
export class OperationService {
  public host = 'http://localhost:8080/operations';
  // @ts-ignore
  constructor(private httpClient: HttpClient) {}
  public getOperations( ) {
    return this.httpClient.get(this.host);
  }

  public getOperationById(id: number ) {
    return this.httpClient.get(this.host + '/{id}');
  }
  public getOperationByCompteId(cpteid: number ) {
    return this.httpClient.get('http://localhost:8080/comptes/' + cpteid + '/operations');
  }
  public deleteResource(url ) {

    return this.httpClient.delete(url);
  }

  public save(data): Observable<Virement> {
    // @ts-ignore
    return this.httpClient.post(this.host, data);
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
