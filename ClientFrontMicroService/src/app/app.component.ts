import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit} from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AuthenticationService } from "./services/authentication.service";
import { Router } from "@angular/router";
import {BehaviorSubject, Subscription} from "rxjs";
import {ClientService} from "./services/client.service";
import {User} from "./user/user";
import {Client} from "./model/client";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements AfterViewInit, OnInit, OnDestroy {

   isAuthenticated:boolean=false;
 private userSub:Subscription;
  title = "ClientFrontMicroService";
  login = {};
 static client :Client;
  constructor(
    private elementRef: ElementRef,
    private http: HttpClient,
    private authService: AuthenticationService,
    private router: Router,
    private clientService:ClientService
  ) {
    //  http.get("login").subscribe((data) => (this.login = data));
  }
  ngOnInit() {
   this.userSub= this.authService.user.subscribe(user=>{
  this.isAuthenticated=!!user;
    if(this.isAuthenticated) this.getClient(user);
   });
  }


  getClient(user){
  this.clientService.getClient(user.id).subscribe(
    (data) => {
      AppComponent.client=new Client().deserialize(data);

    },
    (err) => {
      console.log(err);
    }

  );
  }
  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  onLogout(){
    this.authService.logout();
  }

  onSelectedVirement() {
    this.router.navigateByUrl("/virement");
  }
  onSelectedComptes() {
    this.router.navigateByUrl("/home");
  }

  /*isLogingMode(){
    return AppComponent.loggedIn==true;
  }*/

  ngAfterViewInit(){
    //this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#cccccc';
  }
}




