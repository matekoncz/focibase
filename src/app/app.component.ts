import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {MatToolbar} from '@angular/material/toolbar';
import{ MatMenuModule} from '@angular/material/menu'
import { MatButtonModule} from '@angular/material/button';
import { AuthService } from './shared_services/auth.service';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet,MatToolbar, MatMenuModule, MatButtonModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  constructor(private authservice: AuthService, private router: Router){
  }

  title = 'foci-ng';

  login(){
    this.router.navigate(['/login'])
  }

  home(){
    this.router.navigate(['/'])
  }

  signup(){
    this.router.navigate(['/signup'])
  }

  getCurrentUser(){
    return this.authservice.getCurrentUser()
  }

  isLoggedIn(){
    return this.getCurrentUser()!=null
  }
}
