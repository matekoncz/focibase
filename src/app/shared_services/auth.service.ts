import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private auth: AngularFireAuth) {
   }

   login(email: string, password: string){
      return from(this.auth.signInWithEmailAndPassword(email,password))
   }

   signup(email: string, password: string){
      return from(this.auth.createUserWithEmailAndPassword(email,password))
   }

   signout(){
      return from(this.auth.signOut())
   }

   getCurrentUser(){
    return from(this.auth.user)
   }

   getCurrentEmail(){
      return this.auth.currentUser.then((user)=>{return user?.email});
   }
}
