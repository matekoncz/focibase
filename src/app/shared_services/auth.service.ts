import { Injectable } from '@angular/core';
import {Auth} from '@angular/fire/auth'
import { signInWithEmailAndPassword } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: Auth) {

   }

   login(email: string, password: string){
      signInWithEmailAndPassword(this.auth,email,password)
   }
}
