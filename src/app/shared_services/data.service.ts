import { Injectable } from '@angular/core';
import "firebase/firestore";
import { Team } from '../team';
import {AngularFirestore} from '@angular/fire/compat/firestore'

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private store: AngularFirestore) {
  }

  async addTeam(team: Team){
    return this.store.collection<Team>("teams").doc(team.user+team.name).set(team);
  }

  getTeams(user: string){
    return this.store.collection<Team>("teams", ref => ref.where('user', '==', user)).valueChanges();
  }
}
