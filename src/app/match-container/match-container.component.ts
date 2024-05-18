
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Team } from '../team';
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
import { Match } from '../match';
import { Stadium } from '../stadium';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
@Component({
  selector: 'app-match-container',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [MatIconModule,MatCardModule,FormsModule,MatFormFieldModule,NgFor,MatButtonModule,MatInputModule,MatSelectModule, CommonModule,playerPipe,MatDatepickerModule] ,
  templateUrl: './match-container.component.html',
  styleUrl: './match-container.component.css'
})
export class MatchContainerComponent implements OnInit{
  ngOnInit(): void {
    this.showdate()
  }

  showdate(){
    const storedDate = JSON.stringify(this.match.date)
    console.log(storedDate)
    var date = new Date(JSON.parse(storedDate).seconds * 1000);
    this.datestring= date.toUTCString()
  }
  

  @Input() public availableTeams!: Team[]
  @Input() public availableStadiums!: Stadium[]
  @Input() public editable!: boolean
  @Input() public match!: Match


  public editmode = false;
  public datestring!: string;

  @Output() updateEvent = new EventEmitter<Match>()
  @Output() deleteEvent = new EventEmitter<Match>()

  changeMode(){
    if(this.editable){
      this.editmode=!this.editmode
    }
  }

  update(){
    if(this.match.location==""){
      return
    } else {
      this.updateEvent.emit(this.match)
      console.log("emitted update")
    }
  }

  delete(){
    this.deleteEvent.emit(this.match)
    console.log("emitted delete")
  }

}
