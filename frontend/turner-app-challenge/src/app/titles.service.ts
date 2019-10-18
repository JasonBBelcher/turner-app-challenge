import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TitlesService {
  private URL: string;

  constructor(private http: HttpClient) {
    this.URL = `http://localhost:8080/api/v1/titles`;
  }

  getTitles(query: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.URL}/?TitleName=${query}`);
  }
}
