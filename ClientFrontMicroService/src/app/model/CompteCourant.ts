import { Deserializable } from './deserializable.model';
import { Client } from './client';
import {Compte} from "./compte";

export class CompteCourant extends Compte  implements Deserializable {
    numCompte: number;
    dateCreation: Date;
    solde: number;
    decouvert: number;
    epargne: boolean;
    client: Client;
    static type = 'cc';

    deserialize(input: any) {
        Object.assign(this, input);
        this.client = new Client().deserialize(input.client);
        return this;
      }
}
