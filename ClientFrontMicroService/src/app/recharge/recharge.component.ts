import { Component, OnInit } from "@angular/core";
import { RechargeTelephoneService } from "../services/recharge-telephone.service";
import { Recharge } from "../model/reacharge.model";
import { ComptesService } from "../services/comptes.service";

@Component({
  selector: "app-recharge",
  templateUrl: "./recharge.component.html",
  styleUrls: ["./recharge.component.css"],
})
export class RechargeComponent implements OnInit {
  rechargesList;
  // comptes: Compte[];
  comptes;
  recharge = new Recharge("", 0.0, new Date(), "", 0);
  numCpt = 2;
  clientid = 1;
  cptCourantIdList = [];
  cptEpargneIdList = [];
  // cptIdList = [];
  rechargesComptesList = new Map();
  index = 0;

  constructor(
    private rechargeTelephone: RechargeTelephoneService,
    private comptesService: ComptesService
  ) {}

  ngOnInit(): void {
    // this.getRecharges();
    this.getComptes();
  }

  // getRecharges() {
  //   this.rechargeTelephone.getRechargeTelephones(this.numCpt).subscribe(
  //     (data) => {
  //       this.rechargesList = data;
  //       console.log(data);
  //     },
  //     (err) => {
  //       console.log(err);
  //     }
  //   );
  // }

  getRecharges(value) {
    this.rechargeTelephone.getRechargeTelephones(value).subscribe(
      (data) => {
        this.rechargesList = data;
        console.log(data);
        return true;
      },
      (err) => {
        console.log(err);
        return false;
      }
    );
  }

  // getRecharges() {
  //   for (let id in this.cptIdList) {
  //     this.rechargeTelephone.getRechargeTelephones(id).subscribe(
  //       (data) => {
  //         this.rechargesComptesList.set(id, data);
  //       },
  //       (err) => {
  //         console.log(err);
  //       }
  //     );
  //   }
  //   console.log(this.rechargesComptesList);
  // }

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
        this.setListCptsCourantId();
        console.log(this.cptCourantIdList);
        this.setListCptsEpargneId();
        console.log(this.cptEpargneIdList);
        // this.setListCptsId();
      },
      (err) => {
        console.log("getComptes Error");
      }
    );
  }

  setListCptsCourantId() {
    let i = 0;
    for (let c in this.comptes["_embedded"]["compteCourants"]) {
      this.cptCourantIdList.push(
        this.comptes["_embedded"]["compteCourants"][i]["numCompte"]
      );
      i++;
    }
  }

  setListCptsEpargneId() {
    let i = 0;
    for (let c in this.comptes["_embedded"]["compteEpargnes"]) {
      this.cptEpargneIdList.push(
        this.comptes["_embedded"]["compteEpargnes"][i]["numCompte"]
      );
      i++;
    }
  }

  // setListCptsId() {
  //   let i = 0;
  //   for (let c in this.comptes["_embedded"]["compteCourants"]) {
  //     this.cptIdList.push(
  //       this.comptes["_embedded"]["compteCourants"][i]["numCompte"]
  //     );
  //     i++;
  //   }
  //   i = 0;
  //   for (let c in this.comptes["_embedded"]["compteEpargnes"]) {
  //     this.cptIdList.push(
  //       this.comptes["_embedded"]["compteEpargnes"][i]["numCompte"]
  //     );
  //     i++;
  //   }
  // }
}
