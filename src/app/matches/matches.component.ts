

import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../shared_services/auth.service';
import { DataService } from '../shared_services/data.service';
import { Team } from '../team';
import { Subscription } from 'rxjs';
import { Player } from '../player';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgFor } from '@angular/common';
import {MatSelectModule} from '@angular/material/select';
import { playerPipe } from '../player-pipe';
import { Match } from '../match';
import { Stadium } from '../stadium';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import { MatchContainerComponent } from '../match-container/match-container.component';


@Component({
  selector: 'app-matches',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [MatListModule,MatIconModule,MatCardModule,FormsModule,MatFormFieldModule,NgFor,MatButtonModule,MatInputModule,MatSelectModule, CommonModule,playerPipe,MatDatepickerModule, MatchContainerComponent] ,
  templateUrl: './matches.component.html',
  styleUrl: './matches.component.css'
})
export class MatchesComponent implements OnInit, OnDestroy{
  constructor(private authservice: AuthService, private dataservice: DataService){}

  ngOnDestroy(): void {
    this.teamsSubscription.unsubscribe();
    this.stadiumsSubscription.unsubscribe();
    this.matchesSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.authservice.getCurrentUser().subscribe((user)=>{
      this.username=user!.email!
      this.teamsSubscription=  this.dataservice.getLoadTeamSub().subscribe((teams)=>{
        this.teamList=teams;
        console.log("kuldemeny erkezett")
      });
      this.dataservice.pokeLoadTeamSub(this.username);
      this.stadiumsSubscription=  this.dataservice.getLoadStadiumSub().subscribe((stadium)=>{
        this.stadiumList=stadium;
        console.log("kuldemeny erkezett")
      });
      this.dataservice.pokeLoadStadiumSub(this.username);
      this.matchesSubscription = this.dataservice.getLoadMatchSub().subscribe((matches)=>{
        this.matchesList=matches;
        console.log("matches erkezett")
      });
      this.dataservice.pokeLoadMatchSub(this.username);
      console.log("poked")
    })
  }

  
  username="";

  private teamsSubscription!: Subscription;
  private stadiumsSubscription!: Subscription;
  public hometeam =""
  public awayteam ="";
  public date="";
  public stadium=""
  public teamList: Team[] = []
  public stadiumList: Stadium[] = []

  private matchesSubscription!: Subscription;
  public matchesList: Match[] = []

  makeMatch(){
    if( this.date == null || this.date=="" || this.awayteam=="" || this.hometeam==""  || this.stadium=="" || this.hometeam==this.awayteam){
      console.log(this.matchesList)
      return
    }
    this.authservice.getCurrentUser().subscribe((user)=>{
      let username = user?.email
      let match: Match = {
        user: username!,
        home: this.hometeam,
        away: this.awayteam,
        date: this.date,
        location: this.stadium
      }
      this.dataservice.addMatch(match).subscribe({
        next: ()=>console.log("great success"),
        error: (error)=>console.log("failure", error)
      })
    })
  }

  updateMatch(match: Match){
    console.log("update",match)
    this.dataservice.updateMatch(match).subscribe({
      next: ()=>{
        console.log("great success (update)")
      },
      error: (error)=>{
        console.log("failure:",error)
      }
    })
  }

  deleteMatch(match: Match){
    console.log("delete",match)
    this.dataservice.deleteMatch(match).subscribe({
      next: ()=>{
        console.log("great success (update)")
      },
      error: (error)=>{
        console.log("failure:",error)
      }
    })
  }
}
