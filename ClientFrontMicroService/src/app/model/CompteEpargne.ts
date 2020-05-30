import { Deserializable } from './deserializable.model';
import { Client } from './client';
import {Compte} from "./compte";

export class CompteEpargne extends Compte implements Deserializable{
    numCompte:number;
    dateCreation:Date;
    solde:number;
    tauxInterets:number;
    epargne:boolean;
    client : Client
    static type = 'ce';
    deserialize(input: any) {
        Object.assign(this, input);
        this.client = new Client().deserialize(input.client);
        return this;
      }
}
