import { Component, OnInit } from "@angular/core";
import { RechargeTelephoneService } from "../services/recharge-telephone.service";
import { Recharge } from "../model/reacharge.model";
import { ComptesService } from "../services/comptes.service";
import { Compte } from "../model/compte.model";

@Component({
  selector: "app-recharge",
  templateUrl: "./recharge.component.html",
  styleUrls: ["./recharge.component.css"],
})
export class RechargeComponent implements OnInit {
  listRecharges: Recharge[] = [new Recharge("", 0.0, new Date(), "", 0)];
  comptes;
  recharge = new Recharge("", 0.0, new Date(), "", 0);
  clientid = 1;
  ListRechargesCmptsCourants = [];
  cptIdList = [];

  constructor(
    private rechargeTelephone: RechargeTelephoneService,
    private comptesService: ComptesService
  ) {}

  ngOnInit(): void {
    this.getComptes();
  }

  getListRecharges() {
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
    console.log(this.listRecharges);
  }

  onSaveRecharge() {
    this.recharge.setUrl();
    this.rechargeTelephone.SaveRecharge(this.recharge).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getComptes() {
    this.comptesService.getComptesByClientId(this.clientid).subscribe(
      (data) => {
        this.comptes = data;
        console.log(data);
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
    console.log(this.cptIdList);
    this.getListRecharges();
  }
}
