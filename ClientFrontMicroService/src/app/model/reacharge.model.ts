


export class Recharge {
  constructor(
    public numTel: string,
    public montant: number,
    public date: Date = new Date(),
    public compte: any,
    public compteid: number
  ) {}

  setCompteObject() {
    this.compte = {"numCompte":this.compteid,"type":"cc"};
  }
}
