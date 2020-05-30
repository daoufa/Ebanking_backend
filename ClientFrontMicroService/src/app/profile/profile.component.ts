import { Component, OnInit } from '@angular/core';
import { ClientService } from '../services/client.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  clientId = 1;
  client:any;
  constructor(private clientService : ClientService) { }

  ngOnInit(): void {
    this.getClientInfos();
  }

  getClientInfos(){
    this.clientService.getClient(this.clientId).subscribe((data) =>{
      this.client = data;
      console.log(this.client);
    },err =>{
      console.log("we have a problem");
    }
    );
  }

}
