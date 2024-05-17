import { Injectable } from '@angular/core';
import "firebase/firestore";
import { Team } from '../team';
import {AngularFirestore} from '@angular/fire/compat/firestore'
import {from, map, Observable, Subject} from 'rxjs'
import { Stadium } from '../stadium';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private $loadTeams: Subject<Team[]> = new Subject()
  private $loadStadiums: Subject<Stadium[]> = new Subject()

  constructor(private store: AngularFirestore) {
  }

  getLoadTeamSub(){
    return this.$loadTeams
  }

  getLoadStadiumSub(){
    return this.$loadStadiums
  }

  pokeLoadTeamSub(user: string){
    console.log("poked by",user)
    this.getTeams(user).subscribe((teams)=>{
      console.log("poker got what was coming for them");
      this.$loadTeams.next(teams);
    })
  }

  pokeLoadStadiumSub(user: string){
    console.log("poked by",user)
    this.getStadiums(user).subscribe((stadium)=>{
      console.log("poker got what was coming for them");
      this.$loadStadiums.next(stadium);
    })
    
  }

  addTeam(team: Team){
    return from(this.store.collection<Team>("teams").doc(team.user+team.name).set(team));
  }

  addStadium(stadium: Stadium){
    return from(this.store.collection<Stadium>("stadiums").doc(stadium.user+stadium.name).set(stadium));
  }

  getTeams(user: string){
    return from(this.store.collection<Team>("teams", ref => ref.where('user', '==', user)).valueChanges());
  }

  getStadiums(user: string){
    return from(this.store.collection<Stadium>("stadiums", ref => ref.where('user', '==', user).orderBy('size')).valueChanges());
  }
}
