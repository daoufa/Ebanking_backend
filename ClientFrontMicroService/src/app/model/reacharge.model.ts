

export class Recharge {
  constructor(
    public numTel: string,
    public montant: number,
    public date: Date = new Date(),
    public compte: string,
    public compteid: number
  ) {}

  setUrl() {
    this.compte = "http://localhost:8083/compteCourant/" + this.compteid;
  }
}
