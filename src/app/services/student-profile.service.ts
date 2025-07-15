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
  
  public getStudentExperience(): Observable<any> {
    return this.http.get('http://localhost:8000/api/student-profile/experience');
  }
  public storeStudentExperience(data: any): Observable<any> {
    return this.http.post('http://localhost:8000/api/student-profile/experience', data);
  }
  public updateStudentExperience(id: number, data: any): Observable<any> {
    return this.http.put(`http://localhost:8000/api/student-profile/experience/${id}`, data);
  }
  public deleteStudentExperience(id: number): Observable<any> {
    return this.http.delete(`http://localhost:8000/api/student-profile/experience/${id}`);
  }
  public getStudentSkills(): Observable<any> {
    return this.http.get('http://localhost:8000/api/student-profile/skills');
  }

  public addSkill(name: string): Observable<any> {
    return this.http.post('http://localhost:8000/api/student-profile/skills', { name });
  }

  public deleteSkill(id: number): Observable<any> {
    return this.http.delete(`http://localhost:8000/api/student-profile/skills/${id}`);
}

}

