import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  private apiUrl = 'https://jsonfakery.com/jobs';

  constructor(private http: HttpClient) {}

  getJobs(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  submitApplication(data: FormData) {
    return this.http.post(
      'https://6857131d21f5d3463e546871.mockapi.io/jobs/applications',
      data
    );
  }
}
