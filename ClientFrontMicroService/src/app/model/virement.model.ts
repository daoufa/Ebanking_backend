import {CompteCourant} from "./CompteCourant";
import { Deserializable } from './deserializable.model';
import {Compte} from "./compte";
import {CompteEpargne} from "./CompteEpargne";
export class Virement {

  public numero:number;
  public date:Date;
  public montant:number;
  public compte:Compte;
  public destinataireCompte:Compte;
  deserialize(input: any) {
    if(input['compte']['type']=="cc"){
      Object.assign(this, input);

      this.compte = new CompteCourant().deserialize(input.compte);

    }else{
      Object.assign(this, input);

      this.compte = new CompteEpargne().deserialize(input.compte);
    }

    if(input['destinataireCompte']['type']=="cc"){
      Object.assign(this, input);

      this.compte = new CompteCourant().deserialize(input.destinataireCompte);

    }else{
      Object.assign(this, input);

      this.compte = new CompteEpargne().deserialize(input.destinataireCompte);
    }

    return this;

  }


}


