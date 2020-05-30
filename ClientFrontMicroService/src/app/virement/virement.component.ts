import { Component, OnInit } from '@angular/core';
import {CompteEpargne} from '../model/compteEpargne.model';
import {Virement} from '../model/virement.model';
import {ClientService} from '../services/client.service';
import {htmlAstToRender3Ast} from '@angular/compiler/src/render3/r3_template_transform';
import {HttpClient} from '@angular/common/http';
import {ComptesService} from '../services/comptes.service';
import {Client} from '../model/client.model';
import {OperationService} from '../services/operation.service';
import {any} from "codelyzer/util/function";

@Component({
  selector: 'app-virement',
  templateUrl: './virement.component.html',
  styleUrls: ['./virement.component.css']
})
export class VirementComponent implements OnInit {

  v:Virement;
  compteId: number;
  date:Date;
  virements;
  comptes;
  isEpargne = false;
  mode:number=1;
  modeName:string='Historique';

  constructor(private operationService: OperationService , private compteService: ComptesService) {
  }

  ngOnInit(): void {
    this.getComptes();
this.getVirements();

  }

  getVirements() {
    this.operationService.getVirementsByCompteId(2)
      .subscribe(data => {
        console.log(data);
        this.virements = data;
        console.log(data);
      }, err => {
        console.log(err);
      });
  }


  getComptes() {
    this.compteService.getComptesByClientId(2)
      .subscribe(data => {
        this.comptes = data;
        console.log(this.comptes);
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

  changeMode(){
    if(this.mode==1){
      this.mode=2;
      this.modeName='Nouveau virement';
    }
    else{
      this.mode=1;
      this.modeName='Historique';
    }
  }

}
