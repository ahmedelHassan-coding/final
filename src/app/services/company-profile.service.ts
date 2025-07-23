import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CompanyProfileService {
  constructor(private http: HttpClient) {}

  getCompanyById(id: string | null): Observable<any> {
    return this.http.get(`http://localhost:8000/api/company/${id}`);
  }
  getCompany(): Observable<any> {
    return this.http.get('http://localhost:8000/api/company');
  }
  updateCompanyData(data: FormData): Observable<any> {
    return this.http.put('http://localhost:8000/api/company', data);
  }
}


  


