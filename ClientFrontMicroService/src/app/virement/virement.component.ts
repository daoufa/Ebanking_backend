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
  virements; //= [ new Virement(), new Virement(),new Virement(),new Virement(),new Virement(),new Virement(),new Virement(),new Virement(),new Virement(),new Virement(),new Virement(),new Virement(),new Virement(),new Virement(),new Virement(),new Virement(),new Virement(),new Virement(),new Virement()];
  compte=[new CompteEpargne(), new CompteEpargne(),new CompteEpargne()];

  constructor(private operationService : OperationService ) {
  }

  ngOnInit(): void {
this.getClient();
  }

  getClient(){
    this.operationService.getVirements(0,1)
      .subscribe(data=>{
        this.virements=data;
        console.log(data);
      },err=>{
        console.log(err);
      });
  }
  onGetComptes() {
  }

}
