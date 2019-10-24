import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';
import { TitlesService } from './titles.service';
import { IAwards } from './interfaces/awards.interface';
import { ITitle } from './interfaces/title.interface';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [{ provide: BsDropdownConfig, useValue: { isAnimated: true, autoClose: true } }]
})
export class AppComponent implements OnInit {
  titleNames: string[]
  titles$: Observable<ITitle[]>;
  awards$: Observable<IAwards[]>;
  storylines$: Observable<IStoryline[]>;
  participants$: Observable<IParticipant[]>;
  sortByValue: string;

  isOpen = false;
  isCollapsedAwards = true;
  isCollapsedGenres = true;
  isCollapsedActors = true;
  isCollapsedParticipants = true;

  selected: string;

  constructor(private api: TitlesService) {
    this.selected = '';
    this.sortByValue = 'TitleName';

  }

  ngOnInit() {
    this.updateData();
  }

  updateData() {
    this.api.getTitlesAggregatted(this.selected);
    this.titles$ = this.api.titlesObs;
    this.awards$ = this.api.awardsObs;
    this.storylines$ = this.api.storylinesObs;
    this.participants$ = this.api.participantsObs;

    // loading async straight into autocomplete does not filter as expected
    // instead subscribe and load an array instead of observable stream. 
    this.api.titleNamesObs.subscribe((names) => {
      this.titleNames = names;
    })
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

  getSortByValue(value: string) {
    this.sortByValue = value;
  }
}
