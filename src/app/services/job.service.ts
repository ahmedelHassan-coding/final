import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class JobService {

  constructor(private http: HttpClient) { }
 

  getJobs(): Observable<any> {
    return this.http.get('http://localhost:8000/api/student-profile/jobs');
  }
  storejobs(data: any): Observable<any> {
    return this.http.post('http\://localhost:8000/api/company/jobs', data);
  }
  editjobs(id: string, data: any): Observable<any> {
    return this.http.put(`http://localhost:8000/api/company/jobs/${id}`, data);
  }
  deletejobs(id: string): Observable<any> {
    return this.http.delete(`http://localhost:8000/api/company/jobs/${id}`);
  }
  getJobById(id: string | null): Observable<any> {
    return this.http.get(`http://localhost:8000/api/student-profile/jobs/${id}`);
  }

  submitApplication(id: number, data: FormData) {
    return this.http.post(
      `http://localhost:8000/api/student-profile/jobs/${id}/apply`,
      data
    );
  }

   getJobApplications(): Observable<any> {
    return this.http.get('http://localhost:8000/api/student-profile/jobs/applied');
  }
  getStatistics(): Observable<any> {
    return this.http.get('http://localhost:8000/api/company/statistics');
  }

  cancelApplication(id: number): Observable<any> {
    return this.http.delete(`http://localhost:8000/api/student-profile/jobs/applications/${id}`);
  }
  getCompanyJobs(): Observable<any> {
    return this.http.get(`http://localhost:8000/api/company/jobs`);
  }
  getCompanyJobApplications(id: number): Observable<any> {
    return this.http.get(`http://localhost:8000/api/company/jobs/${id}/applications`);
  }
  updateApplicationStatus(id: number, data: any): Observable<any> {
    return this.http.put(`http://localhost:8000/api/company/job-applications/${id}/status`, data);
  }
  completeApplication(id: number): Observable<any> {
    return this.http.put(`http://localhost:8000/api/student-profile/jobs/applications/${id}/complete`, {});
  }
  deletejob(id: number): Observable<any> {
    return this.http.delete(`http://localhost:8000/api/company/jobs/${id}`);
  }
}
