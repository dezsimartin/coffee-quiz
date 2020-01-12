import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Clue } from '../models/Clue.model';

@Injectable({
  providedIn: 'root'
})
export class ApiCommunicationService {
  protected apiBaseURL: string = environment.apiBaseURL;

  constructor(protected http: HttpClient) { }

  public getRandomClue(): Observable<Clue> {
    return this.http.get(this.apiBaseURL + "random") as Observable<Clue>;
  }
}
