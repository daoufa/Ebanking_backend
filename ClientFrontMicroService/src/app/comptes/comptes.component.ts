import { Component, OnInit } from "@angular/core";
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

 async consulterCompte(numCpt){
   console.log(numCpt["numero"]);
    this.compteService.getCompte(numCpt["numero"]).subscribe(data => {
      this.compte = data;
      console.log(data);
    },err =>{
      console.log(err);
    });

  }

}
