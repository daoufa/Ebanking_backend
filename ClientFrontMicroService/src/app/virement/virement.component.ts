import { Component, OnInit } from '@angular/core';
import {CompteEpargne} from '../model/compteEpargne.model';
import {Virement} from "../model/virement.model";
import {ClientService} from "../services/client.service";
import {htmlAstToRender3Ast} from "@angular/compiler/src/render3/r3_template_transform";
import {HttpClient} from "@angular/common/http";
import {ComptesService} from "../services/comptes.service";
import {Client} from "../model/client.model";
import {OperationService} from "../services/operation.service";

@Component({
  selector: 'app-virement',
  templateUrl: './virement.component.html',
  styleUrls: ['./virement.component.css']
})
export class VirementComponent implements OnInit {

  clients;
  newVirement:Virement=new Virement();
  virements;
  comptes;
  compte;
  compteNum:number;
  isEpargne: boolean = false;

  constructor(private operationService : OperationService ,private compteService : ComptesService) {
  }

  ngOnInit(): void {
this.getClient();
this.getComptes();
  }

  getClient(){

    this.operationService.getOperationByCompteId(1)
      .subscribe(data=>{
        this.virements=data;
        console.log(data);
      },err=>{
        console.log(err);
      });
  }
  isCourant(v:boolean){
    this.isEpargne=!v;
  }

  getComptes() {
    this.compteService.getComptesByClientId(1)
      .subscribe(data=>{
        this.comptes=data;
        console.log(data);
      },err=>{
        console.log(err);
      });
  }

  onSaveVirement(data:any){
    this.newVirement.compteId=1;
    this.newVirement.montant=3000.0;
    this.newVirement.destinataireCompteId=2;
    this.newVirement.dateOperation='10/02/2020';

    console.log(this.newVirement);
   console.log(this.operationService.save(this.newVirement));
  }



}
