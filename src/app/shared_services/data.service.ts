import { Injectable } from '@angular/core';
import "firebase/firestore";
import { Team } from '../team';
import {AngularFirestore} from '@angular/fire/compat/firestore'
import {from, Subject} from 'rxjs'
import { Stadium } from '../stadium';
import { Player } from '../player';
import { Match } from '../match';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private $loadTeams: Subject<Team[]> = new Subject()
  private $loadStadiums: Subject<Stadium[]> = new Subject()
  private $loadPlayers: Subject<Player[]> = new Subject()
  private $loadMatches: Subject<Match[]> = new Subject()

  constructor(private store: AngularFirestore) {
  }

  getLoadTeamSub(){
    return this.$loadTeams
  }

  getLoadMatchSub(){
    return this.$loadMatches
  }

  getLoadPlayerSub(){
    return this.$loadPlayers
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

  pokeLoadPlayerSub(user: string){
    console.log("poked by",user)
    this.getPlayers(user).subscribe((players)=>{
      console.log("poker got what was coming for them (players)");
      this.$loadPlayers.next(players);
    })
  }

  pokeLoadStadiumSub(user: string){
    console.log("poked by",user)
    this.getStadiums(user).subscribe((stadium)=>{
      console.log("poker got what was coming for them");
      this.$loadStadiums.next(stadium);
    })
  }

  pokeLoadMatchSub(user: string){
    console.log("poked by",user)
    this.getMatches(user).subscribe((match)=>{
      console.log("poker got what was coming for them");
      this.$loadMatches.next(match);
    })
  }

  addPlayer(player: Player){
    return from(this.store.collection<Player>("players").doc(player.user+player.name).set(player));
  }

  addTeam(team: Team){
    return from(this.store.collection<Team>("teams").doc(team.user+team.name).set(team));
  }

  addMatch(match: Match){
    return from(this.store.collection<Match>("matches").doc(match.user+match.home+'@'+match.away).set(match));
  }

  addStadium(stadium: Stadium){
    return from(this.store.collection<Stadium>("stadiums").doc(stadium.user+stadium.name).set(stadium));
  }

  getPlayers(user: string){
    return from(this.store.collection<Player>("players", ref => ref.where('user', '==', user)).valueChanges());
  }

  getTeams(user: string){
    return from(this.store.collection<Team>("teams", ref => ref.where('user', '==', user)).valueChanges());
  }

  getStadiums(user: string){
    return from(this.store.collection<Stadium>("stadiums", ref => ref.where('user', '==', user).orderBy('size')).valueChanges());
  }

  getMatches(user: string){
    return from(this.store.collection<Match>("matches", ref => ref.where('user', '==', user)).valueChanges());
  }

  updateMatch(match: Match){
    return from(this.store.collection<Match>("matches").doc(match.user+match.home+'@'+match.away).set(match))
  }

  deleteMatch(match: Match){
    return from(this.store.collection<Match>("matches").doc(match.user+match.home+'@'+match.away).delete())
  }
}
