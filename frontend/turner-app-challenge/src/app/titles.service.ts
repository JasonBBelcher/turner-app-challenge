import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpEvent } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import {ITitle} from './interfaces/title.interface';
import { IAwards } from './interfaces/awards.interface';



@Injectable({
  providedIn: 'root'
})
export class TitlesService {
  private URL: string;
  titlesRepository: {titles: ITitle[], awards: IAwards[], genres: IGenres[], storylines: any[], participants: any[]};
  public titlesObs: Observable<any[]>;
  public awardsObs: Observable<any[]>;
  public storylinesObs: Observable<any[]>;
  public participantsObs: Observable<any[]>;
  private titlesBSubject: BehaviorSubject<any[]>;
  private awardsBSubject: BehaviorSubject<any[]>;
  private storylinesBSubject: BehaviorSubject<any[]>;
  private participantsBSubject: BehaviorSubject<any[]>;



  constructor(private http: HttpClient) {
    this.URL = `http://localhost:8080/api/v1/titles`;
    this.titlesRepository = {titles: [], awards: [], genres: [], storylines: [], participants: []};
    this.titlesBSubject = new BehaviorSubject([]);
    this.awardsBSubject = new BehaviorSubject([]);
    this.storylinesBSubject = new BehaviorSubject([]);
    this.participantsBSubject = new BehaviorSubject([]);
    this.titlesObs = this.titlesBSubject.asObservable();
    this.awardsObs = this.awardsBSubject.asObservable();
    this.storylinesObs = this.storylinesBSubject.asObservable();
    this.participantsObs = this.participantsBSubject.asObservable();
  }

  getTitles(query: string): Observable<ITitle[]> {
    return this.http.get<any[]>(`${this.URL}/?TitleName=${query}`);
  }

  getTitlesAggregatted(query: string): void {

    this.http.get<any[]>(`${this.URL}/?TitleName=${query}`).subscribe((data: any) => {
      this.titlesRepository.titles = data;
      this.titlesRepository.awards = data.map(title => {
        return {id: title._id, TitleName: title.TitleName, ReleaseYear: title.ReleaseYear, Awards: title.Awards };
      });

      this.titlesRepository.storylines = data.map(title => {
        return {id: title._id, TitleName: title.TitleName, ReleaseYear: title.ReleaseYear, storylines: title.Storylines };
      });

      this.titlesRepository.participants = data.map(title => {
        return {id: title._id, TitleName: title.TitleName, ReleaseYear: title.ReleaseYear, Participants: title.Participants };
      });

      this.titlesBSubject.next(Object.assign({}, this.titlesRepository).titles);
      this.awardsBSubject.next(Object.assign({}, this.titlesRepository).awards);
      this.storylinesBSubject.next(Object.assign({}, this.titlesRepository).storylines);
      this.participantsBSubject.next(Object.assign({}, this.titlesRepository).participants);
    });
  }

  getTitleNames(): Promise<any[]> {
    return this.http.get<any[]>(`${this.URL}/names`).toPromise();
  }
}
