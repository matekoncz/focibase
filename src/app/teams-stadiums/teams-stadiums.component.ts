import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import { DataService } from '../shared_services/data.service';
import { Team } from '../team';
import { AuthService } from '../shared_services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-teams-stadiums',
  standalone: true,
  imports: [MatCardModule, MatInputModule,MatFormFieldModule,MatIconModule,MatButtonModule,MatDividerModule,FormsModule],
  templateUrl: './teams-stadiums.component.html',
  styleUrl: './teams-stadiums.component.css'
})
export class TeamsStadiumsComponent {
  constructor(private authservice: AuthService, private dataservice: DataService){}

  public teamname ="";

  makeTeam(){
    let team: Team = {
      name: this.teamname,
      user: this.authservice.getCurrentUser()?.email!
    }
    this.dataservice.addTeam(team);
  }
}
