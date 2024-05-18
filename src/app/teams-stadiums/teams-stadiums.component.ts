import { Component, OnDestroy, OnInit } from '@angular/core';
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
import {MatListModule} from '@angular/material/list';
import { NgFor } from '@angular/common';
import { Subscription } from 'rxjs';
import { Stadium } from '../stadium';

@Component({
  selector: 'app-teams-stadiums',
  standalone: true,
  imports: [MatCardModule, MatInputModule,MatFormFieldModule,MatIconModule,MatButtonModule,MatDividerModule,FormsModule,MatListModule,NgFor],
  templateUrl: './teams-stadiums.component.html',
  styleUrl: './teams-stadiums.component.css'
})
export class TeamsStadiumsComponent implements OnInit, OnDestroy{
  constructor(private authservice: AuthService, private dataservice: DataService){}

  ngOnDestroy(): void {
    this.teamsSubscription.unsubscribe();
    this.stadiumsSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.authservice.getCurrentUser().subscribe((user)=>{
      if(user==null){
        return
      }
      this.username=user!.email!
      this.teamsSubscription=  this.dataservice.getLoadTeamSub().subscribe((teams)=>{
        this.teamList=teams;
        console.log("kuldemeny erkezett")
      });
      this.dataservice.pokeLoadTeamSub(this.username);
      this.stadiumsSubscription=  this.dataservice.getLoadStadiumSub().subscribe((stadiums)=>{
        this.stadiumList=stadiums;
        console.log("kuldemeny erkezett")
      });
      this.dataservice.pokeLoadStadiumSub(this.username);
      console.log("poked")
    })
  }


  private teamsSubscription!: Subscription;
  private username =""
  public teamname ="";
  public teamList: Team[] = []

  private stadiumsSubscription!: Subscription;
  public stadiumLocation=""
  public stadiumName=""
  public stadiumSize="6000"
  public stadiumList: Stadium[] = []

  makeTeam(){
    if(this.teamname==""){
      return
    }
    this.authservice.getCurrentUser().subscribe((user)=>{
      let username = user?.email
      let team: Team = {
        name: this.teamname,
        user: username!
      }
      this.dataservice.addTeam(team).subscribe({
        next: ()=>console.log("great success"),
        error: (error)=>console.log("failure", error)
      })
    })

  }

  makeStadium(){
    if(this.stadiumName=="" || this.stadiumLocation == ""){
      return
    }
      let username = this.username
      let stadium: Stadium = {
        name: this.stadiumName,
        user: username!,
        city: this.stadiumLocation,
        size: parseInt(this.stadiumSize)
      }
      this.dataservice.addStadium(stadium).subscribe({
        next: ()=>console.log("great success"),
        error: (error)=>console.log("failure", error)
      })
    }
}
