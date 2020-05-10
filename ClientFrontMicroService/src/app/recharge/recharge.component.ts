import { Component, OnInit } from '@angular/core';
import {Recharge} from "../model/reacharge.model";

@Component({
  selector: 'app-recharge',
  templateUrl: './recharge.component.html',
  styleUrls: ['./recharge.component.css']
})
export class RechargeComponent implements OnInit {

  recharges=[new Recharge(),new Recharge(),new Recharge(),new Recharge(),new Recharge(),];
  constructor() { }

  ngOnInit(): void {
  }

}
