import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ComptesService } from "../services/comptes.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  numclient = 1;
  comptes;
  constructor(private router: Router, private comptesService: ComptesService) {}

  ngOnInit(): void {
    this.getComptes();
  }

  getComptes() {
    this.comptesService.getComptesByClientId(this.numclient).subscribe(
      (data) => {
        this.comptes = data;
      },
      (err) => {
        console.log("getComptes Error");
      }
    );
  }
}
