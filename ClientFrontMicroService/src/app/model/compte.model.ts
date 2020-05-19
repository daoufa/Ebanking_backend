import { Client } from "./client.model";
import { CompteEpargne } from "./compteEpargne.model";

export class Compte {
  constructor(
    codeCompte: number,
    dateCreation: Date,
    solde: number,
    TYPE_CPTE: string,
    CODE_CLT: number
  ) {}
}
