import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TitlesService } from './titles.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  titles$: Observable<any[]>;
  titleNames: string[];
  isOpen = false;

  selected: string;

  constructor(private api: TitlesService) {}

  ngOnInit() {
    this.titles$ = this.api.getTitles('');
    this.api.getTitleNames().then((names) => {
      this.titleNames = names;
    });
  }

  getSearchTerm() {
    if (!this.selected) {
      this.titles$ = this.api.getTitles(this.selected);
      this.isOpen = false;
      this.selected = '';
    } else {
      this.titles$ = this.api.getTitles(this.selected);
      this.isOpen = true;
      this.selected = '';
    }
  }
}
