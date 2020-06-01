import { Component, OnInit } from '@angular/core';
import { ClientService } from '../services/client.service';
import {Client} from "../model/client";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  clientId:number;
  client:any;
  constructor(private clientService : ClientService) { }

  ngOnInit(): void {
    this.getClientInfos();
  }

  getClientInfos(){
    this.clientId=this.client.code;
    this.clientService.getClient(this.clientId).subscribe((data) =>{
      this.client = data;
      console.log(this.client);
    },err =>{
      console.log(err);
    }
    );
  }

}
