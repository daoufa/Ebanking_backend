import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { FormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { LogoutComponent } from "./logout/logout.component";
import { VirementComponent } from "./virement/virement.component";
import { ComptesComponent } from "./comptes/comptes.component";
import { ProfileComponent } from "./profile/profile.component";
import { RechargeComponent } from "./recharge/recharge.component";
import { AuthenticationService } from "./services/authentication.service";
import { MatDialogModule } from "@angular/material/dialog";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { DialogComponent } from "./dialog/dialog.component";
import { DemandeComponent } from './demande/demande.component';
import {LoadingSpinnerComponent} from "./shared/loading-spinner/loading-spinner.component";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    LogoutComponent,
    VirementComponent,
    ComptesComponent,
    ProfileComponent,
    RechargeComponent,
    DialogComponent,
    DemandeComponent,
    LoadingSpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatDialogModule,
    BrowserAnimationsModule,
   // MatButtonModule,
  ],
  entryComponents: [DialogComponent],
  providers: [
    AuthenticationService,

  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
