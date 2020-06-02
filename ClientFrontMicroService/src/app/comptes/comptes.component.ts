import { Component, OnInit } from '@angular/core';
import { ComptesService } from '../services/comptes.service';

@Component({
  selector: 'app-comptes',
  templateUrl: './comptes.component.html',
  styleUrls: ['./comptes.component.css']
})
export class ComptesComponent implements OnInit {

  public compte : any;
  public clientId : any = 1;
  public message : string ;
  public currentNum : any;
  constructor(private compteService : ComptesService) { }

  ngOnInit(): void {
    this.consulterCompte;
    console.log(history.state.data);
    this.currentNum = history.state.data;
    this.currentAccount();
  }

 async consulterCompte(numCpt){
   console.log(numCpt["numero"]);
    this.compteService.getCompte(numCpt["numero"],this.clientId).subscribe(data => {
      this.compte = data;
      this.message = "";
      console.log(data);
    },err =>{
      this.message = "Pas de compte de ce numero";
      this.compte = null;
    });

  }

  async currentAccount(){
     if(this.currentNum !=null) this.compteService.getCurrentAccount(this.currentNum["c"]).subscribe(data => {
       this.compte = data;
       console.log(data);
     },err =>{
       console.log(err);
     });
    }
}
