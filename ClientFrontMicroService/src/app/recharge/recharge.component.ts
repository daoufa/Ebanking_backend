import { Component, OnInit } from "@angular/core";
import { RechargeTelephoneService } from "../services/recharge-telephone.service";
import { Recharge } from "../model/reacharge.model";
import { ComptesService } from "../services/comptes.service";

//import { Compte } from "../model/compte.model";
import { Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import {
  DialogComponent,
  ConfirmDialogModel,
} from "../dialog/dialog.component";
import { map } from "rxjs/operators";

@Component({
  selector: "app-recharge",
  templateUrl: "./recharge.component.html",
  styleUrls: ["./recharge.component.css"],
})
export class RechargeComponent implements OnInit {
  modelResult: boolean = false;
  listRecharges: Recharge[] = [new Recharge("", 0.0, new Date(), "", 0)];
  comptes;
  recharge = new Recharge("", null, new Date(), "", null);
  clientid = 1;
  cptIdList = [];
  mode = 1;
  modeName = "Historique";

  constructor(
    private rechargeTelephone: RechargeTelephoneService,
    private comptesService: ComptesService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getComptes();
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };
  }

  async openDialog(data) {
    const message = `vous etes sur d'effectuer se recharge`;

    const dialogData = new ConfirmDialogModel("confirmation", message);

    const dialogRef = this.dialog.open(DialogComponent, {
      data: dialogData,
    });

    await dialogRef.afterClosed().subscribe((dialogResult) => {
      this.modelResult = dialogResult;
      this.onSaveRecharge(data);
      this.router.navigateByUrl("/recharge");
    });
  }

  setListRecharges() {
    for (let id in this.cptIdList) {
      this.rechargeTelephone
        .getRechargeTelephones(this.cptIdList[id])
        .subscribe(
          (data) => {
            let i = 0;
            for (let c in data["_embedded"]["rechargeTelephones"]) {
              let date = data["_embedded"]["rechargeTelephones"][i]["date"];
              let montant =
                data["_embedded"]["rechargeTelephones"][i]["montant"];
              let numtel = data["_embedded"]["rechargeTelephones"][i]["numTel"];
              let recharge = new Recharge(
                numtel,
                montant,
                date,
                "",
                Number(this.cptIdList[id])
              );
              this.listRecharges.push(recharge);
              i++;
            }
          },
          (err) => {
            console.log(err);
          }
        );
    }
    this.listRecharges.shift();
  }

  onSaveRecharge(data) {
    if (this.modelResult == true) {
      let res = JSON.stringify(this.recharge);
      let obj = JSON.parse(res);

      obj.compte = { numCompte: data.compteid, type: "cc" };
      this.recharge.setCompte();
      console.log(this.recharge);
      this.rechargeTelephone
        .SaveRecharge(JSON.parse(JSON.stringify(this.recharge)))
        .subscribe(
          (res) => {},
          (err) => {
            console.log(err);
          }
        );
    }
  }

  getComptes() {
    this.comptesService.getComptesByClientId(this.clientid).subscribe(
      (data) => {
        this.comptes = data;
        this.setListCptsId();
      },
      (err) => {
        console.log("getComptes Error");
      }
    );
  }

  setListCptsId() {
    let i = 0;
    for (let c in this.comptes["_embedded"]["compteCourants"]) {
      this.cptIdList.push(
        this.comptes["_embedded"]["compteCourants"][i]["numCompte"]
      );
      i++;
    }
    i = 0;
    for (let c in this.comptes["_embedded"]["compteEpargnes"]) {
      this.cptIdList.push(
        this.comptes["_embedded"]["compteEpargnes"][i]["numCompte"]
      );
      i++;
    }
    console.log("comptes ids : " + this.cptIdList);
    this.setListRecharges();
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
