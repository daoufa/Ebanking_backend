import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { FormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { LogoutComponent } from "./logout/logout.component";
import { HttpInterceptorService } from "./services/http-interceptor.service";
import { VirementComponent } from './virement/virement.component';
import { ComptesComponent } from './comptes/comptes.component';
import { ProfileComponent } from './profile/profile.component';
import { RechargeComponent } from './recharge/recharge.component';
import {AuthenticationService} from "./services/authentication.service";

@NgModule({
  declarations: [AppComponent, HomeComponent, LoginComponent, LogoutComponent, VirementComponent, ComptesComponent, ProfileComponent, RechargeComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [
    AuthenticationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
