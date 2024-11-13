import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StatisticsService {
  private apiUrl = 'https://abdulmohsena--lamha-flask-app.modal.run';

  constructor(private http: HttpClient) {}

  getStatistics(coordinates: number[][]): Observable<any> {
    const payload = { coordinates };
    return this.http.post<any>(`${this.apiUrl}`, payload);
  }
}
