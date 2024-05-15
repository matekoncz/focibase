import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { MatchManagerComponent } from './match-manager/match-manager.component';
import { TeamsStadiumsComponent } from './teams-stadiums/teams-stadiums.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    {path: 'manager', component: MatchManagerComponent},
    {path: 'manager/teams',component: TeamsStadiumsComponent}
];
