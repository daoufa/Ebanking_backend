import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ComptesService } from "../services/comptes.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  compte;
  constructor(private router: Router, private comptesService: ComptesService) {}

  ngOnInit(): void {
    this.compte = this.comptesService.getCompte(1);
  }
}
