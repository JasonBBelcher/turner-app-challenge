import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { ITitle } from './interfaces/title.interface';
import { IAwards } from './interfaces/awards.interface';



@Injectable({
  providedIn: 'root'
})
export class TitlesService {
  private URL: string;
  // Repository for storing the state of the application
  titlesRepository: { titleNames: string[], titles: ITitle[], awards: IAwards[], genres: IGenres[], storylines: IStoryline[], participants: IParticipant[] };
  // publically available properties to be injected into component templates using the async pipe
  public titlesObs: Observable<any[]>;
  public titleNamesObs: Observable<any[]>;
  public awardsObs: Observable<any[]>;
  public storylinesObs: Observable<any[]>;
  public participantsObs: Observable<any[]>;
  // this mananges state updates and passes them along to observables above.
  private titleNamesBSubject: BehaviorSubject<any[]>;
  private titlesBSubject: BehaviorSubject<any[]>;
  private awardsBSubject: BehaviorSubject<any[]>;
  private storylinesBSubject: BehaviorSubject<any[]>;
  private participantsBSubject: BehaviorSubject<any[]>;



  constructor(private http: HttpClient) {
    this.URL = `http://localhost:8080/api/v1/titles`;
    this.titlesRepository = { titleNames: [], titles: [], awards: [], genres: [], storylines: [], participants: [] };
    this.titleNamesBSubject = new BehaviorSubject([]);
    this.titlesBSubject = new BehaviorSubject([]);
    this.awardsBSubject = new BehaviorSubject([]);
    this.storylinesBSubject = new BehaviorSubject([]);
    this.participantsBSubject = new BehaviorSubject([]);
    this.titleNamesObs = this.titleNamesBSubject.asObservable();
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
      // No transformation: just load the entire tree
      this.titlesRepository.titles = data;


      /* Break up the Titles Object into manageable pieces to make loading into templates easier
      * -------------------------------------------------------------------------------------------------------------
      */
      this.titlesRepository.awards = data.map(title => {
        return { id: title._id, TitleName: title.TitleName, ReleaseYear: title.ReleaseYear, Awards: title.Awards };
      });

      this.titlesRepository.storylines = data.map(title => {
        return { id: title._id, TitleName: title.TitleName, ReleaseYear: title.ReleaseYear, storylines: title.Storylines };
      });

      this.titlesRepository.participants = data.map(title => {
        return { id: title._id, TitleName: title.TitleName, ReleaseYear: title.ReleaseYear, Participants: title.Participants };
      });
      if (!this.titlesRepository.titleNames.length) {
        this.titlesRepository.titleNames = data.map(title => {
          return title.TitleName;
        })
        // don't update the observable if it has already been cached to prevent weird behavior
        this.titleNamesBSubject.next(Object.assign({}, this.titlesRepository).titleNames);
      }
      /*
      *   -----------------------------------------------------------------------------------------------------------------
            Pass state to be observed from components
      
      */

      this.titlesBSubject.next(Object.assign({}, this.titlesRepository).titles);
      this.awardsBSubject.next(Object.assign({}, this.titlesRepository).awards);
      this.storylinesBSubject.next(Object.assign({}, this.titlesRepository).storylines);
      this.participantsBSubject.next(Object.assign({}, this.titlesRepository).participants);

    });
  }

}
