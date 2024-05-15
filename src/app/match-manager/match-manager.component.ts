import { Component } from '@angular/core';
import { MatChipsModule} from '@angular/material/chips';
import { RouterModule, Router } from '@angular/router';;

@Component({
  selector: 'app-match-manager',
  standalone: true,
  imports: [MatChipsModule, RouterModule],
  templateUrl: './match-manager.component.html',
  styleUrl: './match-manager.component.css'
})
export class MatchManagerComponent {

  constructor(private router: Router){}

  teams(){
    this.router.navigate(["/manager/teams"]);
  }

  matches(){
    this.router.navigate(["/manager/matches"]);
  }

  players(){
    this.router.navigate(["/manager/players"]);
  }
}
