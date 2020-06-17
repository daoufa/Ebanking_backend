import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit} from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AuthenticationService } from "./services/authentication.service";
import { Router } from "@angular/router";
import {Subscription} from "rxjs";

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

  constructor(
    private elementRef: ElementRef,
    private http: HttpClient,
    private authService: AuthenticationService,
    private router: Router
  ) {
    //  http.get("login").subscribe((data) => (this.login = data));
  }
  ngOnInit() {
   this.userSub= this.authService.user.subscribe(user=>{
  this.isAuthenticated=!!user;
   });
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
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




