import {CompteEpargne} from "./compteEpargne.model";

export class Virement {

  public id: number;
  public dateOperation: string;
  public montant: number;
  public compte: CompteEpargne;
  public destCompte: CompteEpargne;



}
