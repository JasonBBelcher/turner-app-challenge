import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TitlesService } from './titles.service';
import { IAwards } from './interfaces/awards.interface';
import { ITitle } from './interfaces/title.interface';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  titleNames$: Observable<string[]>
  titles$: Observable<ITitle[]>;
  awards$: Observable<IAwards[]>;
  storylines$: Observable<IStoryline[]>;
  participants$: Observable<IParticipant[]>;
  titleNames: string[];
  isOpen = false;
  isCollapsedAwards = true;
  isCollapsedGenres = true;
  isCollapsedActors = true;
  isCollapsedParticipants = true;

  selected: string;

  constructor(private api: TitlesService) {
    this.selected = '';
  }

  ngOnInit() {
    this.updateData();
    this.api.getTitleNames().then((names) => {
      this.titleNames = names;
    });
  }

  updateData() {
    this.api.getTitlesAggregatted(this.selected);
    this.titles$ = this.api.titlesObs;
    this.awards$ = this.api.awardsObs;
    this.storylines$ = this.api.storylinesObs;
    this.participants$ = this.api.participantsObs;
    this.titleNames$ = this.api.titleNamesObs;
  }

  getSearchTerm() {
    if (!this.selected) {
      this.updateData();
      this.isOpen = false;
      this.selected = '';
    } else {
      this.api.getTitlesAggregatted(this.selected);
      this.titles$ = this.api.titlesObs;
      this.awards$ = this.api.awardsObs;
      this.storylines$ = this.api.storylinesObs;
      this.participants$ = this.api.participantsObs;
      this.isOpen = true;
      this.selected = '';
    }
  }
}
