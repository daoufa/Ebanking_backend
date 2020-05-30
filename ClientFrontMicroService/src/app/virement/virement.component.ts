import { Component, OnInit } from '@angular/core';
import {Virement} from '../model/virement.model';
import {htmlAstToRender3Ast} from '@angular/compiler/src/render3/r3_template_transform';
import {HttpClient} from '@angular/common/http';
import {ComptesService} from '../services/comptes.service';
import {OperationService} from '../services/operation.service';
import {CompteCourant} from '../model/CompteCourant';
import {CompteEpargne} from '../model/CompteEpargne';
import {DatePipe} from '@angular/common';
import { async } from 'rxjs/internal/scheduler/async';

@Component({
  selector: 'app-virement',
  templateUrl: './virement.component.html',
  styleUrls: ['./virement.component.css']
})
export class VirementComponent implements OnInit {

  v: Virement;
  compteId: number;
  compte: any;
  destCompte: any;
  date: Date;
  virements;
  comptes;
  cptType: string;
  cptDestType: string;


  res: any;
  isEpargne = false;
  mode = 1;
  modeName = 'Historique';

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

  async getCompte(num: any) {
    let cpt: string;
   await this.compteService.getCompte(num)
      .subscribe(data => {
        if (data['epargne'] == false) { cpt = 'cc';  } else { cpt = 'ce'; }

      }, err => {
        console.log(err);
      });
    return cpt;
  }

  async  onSaveVirement(data: any) {

  this.v = new Virement().deserialize(data);
  this.v.date = new Date();
  // this.datePipe.transform(this.v.date, 'MM/dd/yyyy');
  this.res = JSON.stringify(this.v);
  let obj = JSON.parse(this.res);


  this.cptType = await this.getCompte(data.compte);
  this.cptDestType = await this.getCompte(data.destinataireCompte);
  var type1:string;
  var type2:string;

  if(this.cptType=='cc') type1='cc';
  else type1='ce';
    if(this.cptDestType=='cc') type2='cc';
    else type2='ce';

  obj.compte = {numCompte: data.compte, type:type1};
  obj.destinataireCompte = {numCompte: data.destinataireCompte, type:type2};

  this.operationService.save(obj)
     .subscribe(data => {
       // console.log(data);
     }, err => {
       console.log(err);
     });
  }

  changeMode() {
    if (this.mode == 1) {
      this.mode = 2;
      this.modeName = 'Nouveau virement';
    } else {
      this.mode = 1;
      this.modeName = 'Historique';
    }
  }

}
