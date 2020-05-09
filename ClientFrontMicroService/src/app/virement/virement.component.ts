import { Component, OnInit } from '@angular/core';
import {CompteEpargne} from '../model/compteEpargne.model';
import {Virement} from "../model/virement.model";

@Component({
  selector: 'app-virement',
  templateUrl: './virement.component.html',
  styleUrls: ['./virement.component.css']
})
export class VirementComponent implements OnInit {



  virements = [ new Virement(), new Virement(),new Virement(),new Virement(),new Virement(),new Virement(),new Virement(),new Virement(),new Virement(),new Virement(),new Virement(),new Virement(),new Virement(),new Virement(),new Virement(),new Virement(),new Virement(),new Virement(),new Virement()];
  compte=[new CompteEpargne(), new CompteEpargne(),new CompteEpargne()];
  constructor() {
  }

  ngOnInit(): void {
  }

  onGetComptes() {
  }

}
