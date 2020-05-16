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
  comptes;
  recharge = new Recharge("", 0.0, new Date(), "", 0);
  numCpt = 2;
  clientid = 1;

  constructor(
    private rechargeTelephone: RechargeTelephoneService,
    private comptesService: ComptesService
  ) {}

  ngOnInit(): void {
    this.getRecharges();
    this.getComptes();
  }

  getRecharges() {
    this.rechargeTelephone.getRechargeTelephones(this.numCpt).subscribe(
      (data) => {
        this.rechargesList = data;
        console.log(data);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  onSaveRecharge() {
    this.recharge.setUrl(this.numCpt);
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
      },
      (err) => {
        console.log("getComptes Error");
      }
    );
  }
}
