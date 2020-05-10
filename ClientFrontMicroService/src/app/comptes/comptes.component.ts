import { Component, OnInit } from '@angular/core';
import { Compte } from '../model/compte.model';
import { ComptesService } from '../services/comptes.service';

@Component({
  selector: 'app-comptes',
  templateUrl: './comptes.component.html',
  styleUrls: ['./comptes.component.css']
})
export class ComptesComponent implements OnInit {

  public compte : any;

  constructor(private compteService : ComptesService) { }

  ngOnInit(): void {
    this.consulterCompte;
  } 

  consulterCompte(numCpt : number){

    this.compteService.getCompte(numCpt).subscribe(data => {
      this.compte = data;
      console.log(data);
    },err =>{
      console.log(err);
    });

  }

}
