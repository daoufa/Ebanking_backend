import { Component, OnInit } from '@angular/core';
import {CompteEpargne} from '../model/compteEpargne.model';

@Component({
  selector: 'app-virement',
  templateUrl: './virement.component.html',
  styleUrls: ['./virement.component.css']
})
export class VirementComponent implements OnInit {


  numbers=["123456","123456785",'12345678998745'];

  compte=[new CompteEpargne(), new CompteEpargne(),new CompteEpargne()];
  constructor() {
  }

  ngOnInit(): void {
  }

  onGetComptes() {
  }

}
