import { CompteEpargne } from "./compteEpargne.model";

export class Recharge {
  constructor(
    public numTel: string,
    public montant: number,
    public date: Date = new Date(),
    public compte: string,
    public compteid: number
  ) {}

  setUrl(numCpt: any) {
    this.compte = "http://localhost:8080/compteCourant/" + numCpt;
  }
}
