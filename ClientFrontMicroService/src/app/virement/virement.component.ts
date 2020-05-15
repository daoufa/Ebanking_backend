import { Component, OnInit } from '@angular/core';
import {CompteEpargne} from '../model/compteEpargne.model';
import {Virement} from '../model/virement.model';
import {ClientService} from '../services/client.service';
import {htmlAstToRender3Ast} from '@angular/compiler/src/render3/r3_template_transform';
import {HttpClient} from '@angular/common/http';
import {ComptesService} from '../services/comptes.service';
import {Client} from '../model/client.model';
import {OperationService} from '../services/operation.service';

@Component({
  selector: 'app-virement',
  templateUrl: './virement.component.html',
  styleUrls: ['./virement.component.css']
})
export class VirementComponent implements OnInit {

  clients;
  compteId: number;
  newVirement: Virement = new Virement();
  virements;
  comptes;
  compte;
  compteNum: number;
  isEpargne = false;

  constructor(private operationService: OperationService , private compteService: ComptesService) {
  }

  ngOnInit(): void {
this.getVirements();
this.getComptes();
  }

  getVirements() {

    this.operationService.getOperationById(1)
      .subscribe(data => {
        this.virements = data;
        console.log(data);
      }, err => {
        console.log(err);
      });
  }
  isCourant(v: boolean) {
    this.isEpargne = !v;
  }

  getComptes() {
    this.compteService.getComptesByClientId(2)
      .subscribe(data => {
        this.comptes = data;
        console.log(data);
      }, err => {
        console.log(err);
      });
  }

  onSaveVirement(data: any) {
  data['date']=new Date();
  data.compte = 'http://localhost:8080/comptes/' + this.compteId;
  data.destinataireCompte = 'http://localhost:8080/comptes/' + data.destinataireCompte;
  console.log(data.destinataireCompte);
  this.operationService.save(data)
     .subscribe(data => {
       console.log(data);
     }, err => {
       console.log(err);
     });
  }



}
