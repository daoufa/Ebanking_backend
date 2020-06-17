export class User {
  constructor(
    public code:string,
    public password:string,
    private _token:string,
    /*private _tokenExperationDate:Date*/) {
  }


    get token(){
    if(!this._token /*|| new Date() > this._tokenExperationDate*/)
      return null;
    return this._token;
    }
}
