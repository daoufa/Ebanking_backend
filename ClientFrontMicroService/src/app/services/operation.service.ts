import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Client} from "../model/client.model";
import {HttpClient} from "@angular/common/http";
import {Virement} from "../model/virement.model";

@Injectable({
  providedIn: 'root'
})
export class OperationService {
  public host: string = 'http://localhost:8080/operations';
  // @ts-ignore
  constructor(private httpClient: HttpClient) {}
  public getVirements(page:number,size:number ){
    return this.httpClient.get(this.host);
  }
  /* public getProductsByKeyword(mc:string,page:number,size:number ){

     return this.httpClient.get(this.host+"/search/byDesignationPage?mc="+mc+"&page="+page+"&size="+size);
   }
 */
  public deleteResource(url ) {

    return this.httpClient.delete(url);
  }

  public save(data):Observable<Virement>{
    // @ts-ignore
    return this.httpClient.post(this.host,data);
  }

  public getResource(url) :Observable<Virement> {
    // @ts-ignore
    return this.httpClient.get(url);
  }

  public updateResource(data)  {
    // @ts-ignore
    return this.httpClient.put(this.host,data);
  }


}
