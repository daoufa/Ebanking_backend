import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";
import { ComptesService } from "../services/comptes.service";
import { ClientService } from "../services/client.service";
import { AppComponent } from '../app.component';

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  public start:boolean=false;
  

  client;
  comptes;
  constructor(
    private router: Router,
    private comptesService: ComptesService,
    private clientService: ClientService
  ) {}

  ngOnInit(): void {
    this.getComptes();
    this.getClient();
  }

  getComptes() {
    this.comptesService.getComptesByClientId(AppComponent.client.code).subscribe(
      (data) => {
        this.comptes = data;
      },
      (err) => {
        console.log("getComptes Error");
      }
    );
  }

  getClient() {
    this.clientService.getClient(AppComponent.client.code).subscribe(
      (data) => {
        this.client = data;
      },
      (err) => {
        console.log("getComptes Error");
      }
    );
  }



  onstart() {
    this.start = true;
  }
  goToMoreInfos(c){
    this.router.navigate(['/comptes'],{state : {data: {c}}});

  }
}
