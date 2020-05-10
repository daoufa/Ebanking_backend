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
  getCompteIdByOperation(id:number){
     this.compte=this.compteService.getComptesByOperationId(id)
       .subscribe(data=>{
         this.compteNum=data['numCompte'];
         console.log(data['numCompte']);
       },err=>{
         console.log(err);
       });
     this.compte.unsubscribe;

  }

}
