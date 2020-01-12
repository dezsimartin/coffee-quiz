import { Component, OnInit } from '@angular/core';
import { ApiCommunicationService } from 'src/app/services/api-communication.service';
import { Clue } from 'src/app/models/Clue.model';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  
  public clue: Clue;
  public answer: string;
  public requestedClues: Array<Clue> = [];
  public tiles: Tile[] = [
    {text: 'Question' , cols: 3, rows: 1, color: 'lightblue'},
    {text: 'Skip', cols: 1, rows: 2, color: 'lightgreen'},
    {text: 'Time', cols: 1, rows: 1, color: 'lightpink'},
    {text: 'Answer', cols: 2, rows: 1, color: 'lightgrey'},
  ];

  public interval;
  public timeLeft: number;
  public timerStarted: boolean = false;

  constructor(private api: ApiCommunicationService) { }

  ngOnInit() {
    this.getRandomClue();
  }

  public getRandomClue() {
    if(this.timerStarted) {
      this.timerStarted = !this.timerStarted;
      clearInterval(this.interval);
      this.timeLeft = null;
    }
    if(this.answer){
      this.requestedClues.filter(data => { 
        if(data.id === this.clue.id){
          data.user_answer = this.answer;
        }
      })
    }
    this.api.getRandomClue().subscribe(data => {
      this.clue = data[0];
      this.clue.user_answer = null;
      this.requestedClues.push(this.clue);
      console.log(this.requestedClues);
    });
  }

  public  startTimer() {
    this.timerStarted = true;
    this.interval = setInterval(() => {
      if(this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.timeLeft = 120;
      }
    },1000)
  }
}
