import {Client} from "./client.model";
import { CompteEpargne } from './compteEpargne.model';

export class Compte {


   codeCompte:number;
   dateCreation:Date;
   solde:number;
   type:CompteEpargne;
   client: Client;
}