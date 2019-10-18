import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TitlesService } from './titles.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  titles$: Observable<any[]>;
  isOpen = false;

  constructor(private api: TitlesService) {}

  ngOnInit() {
    this.titles$ = this.api.getTitles('');
  }

  getSearchQuery(form: NgForm) {
    if (form.value.TitleName === '') {
      this.titles$ = this.api.getTitles(form.value.TitleName);
      this.isOpen = false;
      form.setValue({ TitleName: '' });
    } else {
      this.titles$ = this.api.getTitles(form.value.TitleName);
      this.isOpen = true;
      form.setValue({ TitleName: '' });
    }
  }
}
