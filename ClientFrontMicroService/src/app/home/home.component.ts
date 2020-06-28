import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";
import { ComptesService } from "../services/comptes.service";
import { ClientService } from "../services/client.service";
import { AppComponent } from '../app.component';
import { Client } from '../model/client';

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  public start: boolean = false;

  client : Client;
  comptes;
  constructor(
    private router: Router,
    private comptesService: ComptesService,
    private clientService: ClientService
  ) { }

  ngOnInit(): void {
    this.client = AppComponent.client;
    this.getComptes();
  }

  getComptes() {
    this.comptesService.getComptesByClientId(this.client.code).subscribe(
      (data) => {
        this.comptes = data;
        console.log(this.comptes);
      },
      (err) => {
        console.log(err);
        console.log("getComptes Error");
      }
    );
  }

  onstart() {
    this.start = true;
  }
  goToMoreInfos(c) {
    this.router.navigate(['/comptes'], { state: { data: { c } } });

  }
}
