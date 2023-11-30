import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AppComponent } from "./app.component";
import { HomeComponent } from "./home";
import { LoginComponent } from "./account";
import { RegisterComponent } from "./account";
import { SurfComponent } from "./surf";

const routes: Routes = [
    { path: '', redirectTo: 'account/login', pathMatch: 'full' },
    { path: 'account/login',component: LoginComponent},
    { path: 'account/register',component: RegisterComponent},
    { path: 'home', component: HomeComponent},
    { path: 'surf', component: SurfComponent},
    

    //otherwise redirects to home
    { path:'**', redirectTo: ''}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule] 
})
export class AppRoutingModule { }