import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) {}

  public getalljobs(): Observable<any> {
    return this.http.get('http://localhost:8000/api/admins/jobs');
  }
  public getallapplications(): Observable<any> {
    return this.http.get('http://localhost:8000/api/admin/applications');
  }
  public getallstudents(): Observable<any> {
    return this.http.get('http://localhost:8000/api/admin/students');
  }
  public getallcompanies(): Observable<any> {
    return this.http.get('http://localhost:8000/api/admin/companies');
  }

}
