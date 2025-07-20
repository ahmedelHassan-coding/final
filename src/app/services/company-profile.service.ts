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
  updateCompanyData(data: any): Observable<any> {
    // If data is FormData, don't set Content-Type header
    // Browser will automatically set it with boundary for multipart/form-data
    if (data instanceof FormData) {
      return this.http.put('http://localhost:8000/api/company', data);
    } else {
      // For JSON data, set Content-Type header
      return this.http.put('http://localhost:8000/api/company', data, {
        headers: { 'Content-Type': 'application/json' }
      });
    }
  }
}


  


