import { Component, OnInit } from "@angular/core";
import { Virement } from "../model/virement.model";
import { htmlAstToRender3Ast } from "@angular/compiler/src/render3/r3_template_transform";
import { HttpClient } from "@angular/common/http";
import { ComptesService } from "../services/comptes.service";
import { OperationService } from "../services/operation.service";
import { CompteCourant } from "../model/CompteCourant";
import { CompteEpargne } from "../model/CompteEpargne";
import { DatePipe } from "@angular/common";
import { async } from "rxjs/internal/scheduler/async";
import { Router } from "@angular/router";
import {AppComponent} from "../app.component";
import {Client} from "../model/client";
import {Subscription} from "rxjs";
import {ClientService} from "../services/client.service";
import {AuthenticationService} from "../services/authentication.service";

@Component({
  selector: "app-virement",
  templateUrl: "./virement.component.html",
  styleUrls: ["./virement.component.css"],
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
  modeName = "Historique";
  private userSub:Subscription;

  constructor(
    private operationService: OperationService,
    private compteService: ComptesService,
    private router: Router,
    private clientService:ClientService,
    private authService:AuthenticationService
  ) {}

  ngOnInit(): void {
    this.getComptes();
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };
  }



  getVirements(cptNum : number) {
    this.operationService.getVirementsByCompteId(cptNum).subscribe(
      (data) => {
        console.log(data);
        this.virements = data;
        console.log(data);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getComptes() {
    this.compteService.getComptesByClientId(AppComponent.client.code).subscribe(
      (data) => {
        this.comptes = data;
        let i = 0;
        for (let c in data["_embedded"]["compteCourants"]) {
          let compteNum = data["_embedded"]["compteCourants"][i]["numCompte"];
          this.getVirements(compteNum);
          i++;
        }
        for (let c in data["_embedded"]["compteEpargnes"]) {
          let compteNum = data["_embedded"]["compteEpargnes"][i]["numCompte"];
          this.getVirements(compteNum);
          i++;
        }
        
      },
      (err) => {
        console.log(err);
      }
    );
  }

  async onSaveVirement(data: any) {
    this.v = new Virement().deserialize(data);
    this.v.date = new Date();
    // this.datePipe.transform(this.v.date, 'MM/dd/yyyy');
    this.res = JSON.stringify(this.v);
    let obj = JSON.parse(this.res);

    obj.compte = { numCompte: data.compte, type: "cc" };
    obj.destinataireCompte = { numCompte: data.destinataireCompte, type: "cc" };

    this.operationService.save(obj).subscribe(
      (data) => {
        // console.log(data);
        this.router.navigateByUrl("/virement");
      },
      (err) => {
        console.log(err);
      }
    );
  }

  changeMode() {
    if (this.mode == 1) {
      this.mode = 2;
      this.modeName = "Nouveau virement";
    } else {
      this.mode = 1;
      this.modeName = "Historique";
    }
  }
}
