import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Clue } from '../models/Clue.model';
import { Category } from '../models/Category. model';

@Injectable({
  providedIn: 'root'
})
export class ApiCommunicationService {
  protected apiBaseURL: string = environment.apiBaseURL;

  constructor(protected http: HttpClient) { }

  public getRandomClue(): Observable<Clue> {
    return this.http.get(this.apiBaseURL + "random") as Observable<Clue>;
  }

  public getCategoryClue(category_id: number): Observable<Array<Clue>> {
    let httpParams = new HttpParams();
    httpParams = httpParams.append("category", category_id.toString());
    return this.http.get(this.apiBaseURL + "clues", { params: httpParams}) as Observable<Array<Clue>>;
  }

  public getCategories(): Observable<Array<Category>> {
    let httpParams = new HttpParams();
    httpParams = httpParams.append("count", "100");
    return this.http.get(this.apiBaseURL + "categories", {params: httpParams }) as Observable<Array<Category>>;
  }
}
