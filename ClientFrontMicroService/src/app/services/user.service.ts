import {HttpClient} from "@angular/common/http";
import {AuthenticationService} from "./authentication.service";
import {ComptesService} from "./comptes.service";
import {Injectable} from "@angular/core";
@Injectable({
  providedIn: "root",
})
export class UserService {

  public host = 'http://localhost:8080/users/';

  // @ts-ignore
  constructor(
    private httpClient: HttpClient,

  ) {}
  public getUsersId(username) {
    return this.httpClient.get(this.host+username);
  }
}
