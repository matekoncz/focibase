import { Injectable } from '@angular/core';
import {Auth} from '@angular/fire/auth'
import { User, signInWithEmailAndPassword , createUserWithEmailAndPassword} from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loaded_user:User|null

  constructor(private auth: Auth) {
      this.loaded_user=this.auth.currentUser
   }

   async login(email: string, password: string){
      return signInWithEmailAndPassword(this.auth,email,password)
   }

   async signup(email: string, password: string){
      return createUserWithEmailAndPassword(this.auth,email,password)
   }

   getCurrentUser():User|null{
    return this.loaded_user
   }
}
