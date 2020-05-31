import { Component, OnInit } from "@angular/core";
import { RechargeTelephoneService } from "../services/recharge-telephone.service";
import { Recharge } from "../model/reacharge.model";
import { ComptesService } from "../services/comptes.service";

//import { Compte } from "../model/compte.model";
import { Router } from "@angular/router";

@Component({
  selector: "app-recharge",
  templateUrl: "./recharge.component.html",
  styleUrls: ["./recharge.component.css"],
})
export class RechargeComponent implements OnInit {
  listRecharges: Recharge[] = [new Recharge("", 0.0, new Date(), "", 0)];
  comptes;
  recharge = new Recharge("", null, new Date(), "", null);
  clientid = 1;
  cptIdList = [];

  constructor(
    private rechargeTelephone: RechargeTelephoneService,
    private comptesService: ComptesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getComptes();
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };
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

  onSaveRecharge() {
    this.recharge.setUrl();
    this.rechargeTelephone.SaveRecharge(this.recharge).subscribe(
      (res) => {
        this.router.navigateByUrl("/recharge");
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
}
