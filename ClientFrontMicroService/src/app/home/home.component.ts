import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";
import { ComptesService } from "../services/comptes.service";
import { ClientService } from "../services/client.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  @Input() public clientid = 1;
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
<<<<<<< HEAD
    this.comptesService.getComptesByClientId(this.numclient).subscribe(
=======
    this.comptesService.getComptesByClientId(this.clientid).subscribe(
>>>>>>> 794e4fbe59393a1411b768e31978dade7c1f5856
      (data) => {
        this.comptes = data;
      },
      (err) => {
        console.log("getComptes Error");
      }
    );
  }

  getClient() {
    this.clientService.getClient(this.clientid).subscribe(
      (data) => {
        this.client = data;
      },
      (err) => {
        console.log("getComptes Error");
      }
    );
  }
}
