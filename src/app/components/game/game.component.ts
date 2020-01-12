import { Component, OnInit } from '@angular/core';
import { ApiCommunicationService } from 'src/app/services/api-communication.service';
import { Clue } from 'src/app/models/Clue.model';
import { Category } from 'src/app/models/Category. model';

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
  
  public categories: Array<Category>;
  public selectedCategory: number;
  public clue: Clue;
  public answer: string;
  public correctAnswers: number = 0;
  public requestedClues: Array<Clue> = [];
  public tiles: Tile[] = [
    {text: 'Question' , cols: 3, rows: 1, color: 'lightgreen'},
    {text: 'Skip', cols: 1, rows: 2, color: 'lightblue'},
    {text: 'Time', cols: 1, rows: 1, color: 'lightpink'},
    {text: 'Answer', cols: 2, rows: 1, color: 'lightgrey'},
  ];

  public interval;
  public timeLeft: number;
  public timerStarted: boolean = false;

  constructor(private api: ApiCommunicationService) { }

  ngOnInit() {
    this.api.getCategories().subscribe(data => { this.categories = data; console.log(this.categories); });
    this.getRandomClue();
  }

  public getNextQuestion() {
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
    this.countCorrectAnswers();
    if(this.selectedCategory){
      this.getCategorizedClue();
    } else {
      this.getRandomClue();
    }
  }

  public getRandomClue() {
    this.api.getRandomClue().subscribe(data => {
      this.clue = data[0];
      this.clue.user_answer = null;
      this.requestedClues.push(this.clue);
      console.log(this.requestedClues);
    });
  }

  public getCategorizedClue(){
    this.api.getCategoryClue(this.selectedCategory).subscribe(data => {
      console.log(data);
      let rng = Math.floor((Math.random() * data.length - 1) + 1);
      console.log(rng);
      this.clue = data[rng];
      this.clue.user_answer = null;
      this.requestedClues.push(this.clue);
      console.log(this.requestedClues);
    })
  }

  public showAnswer() {
    this.timeLeft = 0;
  }

  public  startTimer() {
    this.timerStarted = true;
    this.interval = setInterval(() => {
      if(this.timeLeft > 0) {
        this.timeLeft--;
      } else if (this.timeLeft === 0) {
        clearInterval(this.interval);
      } else {
        this.timeLeft = 120;
      }
    },1000)
  }

  public countCorrectAnswers() {
    let counter = 0;
    this.requestedClues.forEach(data => {
      if(data.answer === data.user_answer){
        counter++;
      }
      this.correctAnswers = counter;
    })
  }
}
