import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { VirementComponent } from "./virement/virement.component";
import { ComptesComponent } from './comptes/comptes.component';
import { ProfileComponent } from './profile/profile.component';
import { RechargeComponent } from './recharge/recharge.component';

const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "login", component: LoginComponent },
  { path: "virement", component: VirementComponent },
  { path: "comptes", component: ComptesComponent },
  {path: "profiles", component: ProfileComponent },
  {path: "recharge", component: RechargeComponent },
  { path: "", pathMatch: "full", redirectTo: "/virement" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
