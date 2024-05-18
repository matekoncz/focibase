import { AfterViewInit, Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {MatToolbar} from '@angular/material/toolbar';
import{ MatMenuModule} from '@angular/material/menu'
import { MatButtonModule} from '@angular/material/button';
import { AuthService } from './shared_services/auth.service';
import { RouterModule, Router } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet,MatToolbar, MatMenuModule, MatButtonModule, RouterModule, MatIconModule,RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements AfterViewInit{

  isLoggedIn=false
  user : firebase.default.User|null = null;

  constructor(private authservice: AuthService, private router: Router){
  }
  ngAfterViewInit(): void {
    this.checkLogin()
  }

  title = 'foci-ng';

  login(){
    this.router.navigate(['/login'])
  }

  home(){
    this.router.navigate(['/'])
    console.log(this.authservice.getCurrentUser())
  }

  signup(){
    this.router.navigate(['/signup'])
  }

  signout(){
    this.authservice.signout().subscribe(()=>{
      this.checkLogin()
    })
  }

  manager(){
    this.router.navigate(['/manager'])
  }

  getCurrentUser(){
    return this.authservice.getCurrentUser()
  }

  checkLogin() {
    this.authservice.getCurrentUser().subscribe((user)=>{
      if(user != null){
        this.isLoggedIn=true;
        this.user=user
      } else {
        this.isLoggedIn=false
        this.user=null
      }
    })
  }
}


