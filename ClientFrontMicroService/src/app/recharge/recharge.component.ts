import { Component, OnInit } from '@angular/core';
import {Recharge} from "../model/reacharge.model";
import {OperationService} from "../services/operation.service";

@Component({
  selector: 'app-recharge',
  templateUrl: './recharge.component.html',
  styleUrls: ['./recharge.component.css']
})
export class RechargeComponent implements OnInit {

  recharges;
  constructor(private operationService : OperationService) { }

  ngOnInit(): void {
    this.getRecharges();
  }

  getRecharges(){

    this.operationService.getOperationByCompteId(1)
      .subscribe(data=>{
        this.recharges=data;
        console.log(data);
      },err=>{
        console.log(err);
      });
  }

}
