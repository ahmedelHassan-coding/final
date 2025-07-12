import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StudentProfileService {

  constructor(private http: HttpClient) { }
  public getStudentProfile():Observable<any> {
    return this.http.get('http://localhost:8000/api/student-profile');
  }
  public getStudentSkills(): Observable<any> {
    return this.http.get('http://localhost:8000/api/student-profile/skills');
  }
  public getStudentExperience(): Observable<any> {
    return this.http.get('http://localhost:8000/api/student-profile/experience');
  }
}

