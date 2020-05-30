import { Deserializable } from './deserializable.model';

export class Client implements Deserializable{
  code: number;
  nom: string;
  prenom: string ;
  email: string;
  tel: string;
  sexe: string ;
  estSuspendu: boolean;
  dateNaissance: Date
  nationalite: string;
  paysResidence: string;
  situationProf: string;
  profession: string;
  cin: string;
  ville: string;
  identitePhoto:string;
  passportPhoto: string;

  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}
