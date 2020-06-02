import { Component, OnInit } from '@angular/core';
import { ClientService } from '../services/client.service';
import {Client} from "../model/client";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  clientId:number = 1;
  client:Client;
  constructor(private clientService : ClientService) { }

  ngOnInit(): void {
    this.getClientInfos();
  }

  getClientInfos(){ 
    this.clientService.getClient(this.clientId).subscribe((data) =>{
      this.client = new Client().deserialize(data);
      console.log(this.client);
    },err =>{
      console.log(err);
    }
    );
  }

}
