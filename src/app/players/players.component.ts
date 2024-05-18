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

@Component({
  selector: 'app-players',
  standalone: true,
  imports: [MatListModule,MatIconModule,MatCardModule,FormsModule,MatFormFieldModule,NgFor,MatButtonModule,MatInputModule,MatSelectModule, CommonModule,playerPipe] ,
  templateUrl: './players.component.html',
  styleUrl: './players.component.css'
})
export class PlayersComponent implements OnInit, OnDestroy{
  constructor(private authservice: AuthService, private dataservice: DataService){}

  ngOnDestroy(): void {
    this.teamsSubscription.unsubscribe();
    this.playersSubscription.unsubscribe();
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
      this.playersSubscription = this.dataservice.getLoadPlayerSub().subscribe((players)=>{
        this.playerList=players;
        console.log("players erkezett")
      });
      this.dataservice.pokeLoadPlayerSub(this.username);
      console.log("poked")
    })
  }

  
  username="";

  private teamsSubscription!: Subscription;
  public playername =""
  public playerteam ="";
  public playernumber="";
  public teamList: Team[] = []

  private playersSubscription!: Subscription;
  public playerList: Player[] = []

  makePlayer(){
    if(this.playernumber=="0" || this.playername=="" || this.playerteam==""){
      console.log(this.playerList)
      return
    }
    this.authservice.getCurrentUser().subscribe((user)=>{
      let username = user?.email
      let player: Player = {
        name: this.playername,
        user: username!,
        shirtNum: parseInt(this.playernumber),
        team: this.playerteam
      }
      this.dataservice.addPlayer(player).subscribe({
        next: ()=>console.log("great success"),
        error: (error)=>console.log("failure", error)
      })
    })
  }
}
