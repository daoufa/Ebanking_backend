


export class Recharge {
  constructor(
    public numTel: string,
    public montant: number,
    public date: Date = new Date(),
    public compte: any,
    public compteid: number
  ) {
  }


  setCompte() {

    var y: number = +this.compteid;
    this.compteid=y;
    this.compte = {"numCompte":this.compteid,"type":"cc"}

    /* setCompteObject() {
       this.compte = {"numCompte":this.compteid,"type":"cc"};

     }*/
  }


}
