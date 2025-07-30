import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admindashboard',
  imports: [CommonModule],
  templateUrl: './admindashboard.component.html',
  styleUrl: './admindashboard.component.css'
})
export class AdmindashboardComponent {
  jobs: any[] = [];
  totaljobs = 0;
  applications: any[] = [];
  totalapplications = 0;
  students: any[] = [];
  totalstudents = 0;
  companies: any[] = [];
  totalcompanies = 0;
  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.adminService.getalljobs().subscribe(data => {
      this.jobs = data.jobs;
      this.totaljobs= data.count;
    });
    this.adminService.getallapplications().subscribe(data => {
      this.applications = data.applications;
      this.totalapplications = data.count;
    });
    this.adminService.getallstudents().subscribe(data => {
      this.students = data.students;
      this.totalstudents = data.count;
    });
    this.adminService.getallcompanies().subscribe(data => {
      this.companies = data.companies;
      this.totalcompanies = data.count;
    });
  }
  deleteStudent(id: number) {
    this.adminService.deleteStudent(id).subscribe(() => {
      this.students = this.students.filter(student => student.id !== id);
      this.totalstudents--;
    });
  }
  deleteCompany(id: number) {
    this.adminService.deleteCompany(id).subscribe(() => {
      this.companies = this.companies.filter(company => company.id !== id);
      this.totalcompanies--;
    });
  }
  deleteJob(id: number) {
    this.adminService.deleteJob(id).subscribe(() => {
      this.jobs = this.jobs.filter(job => job.id !== id);
      this.totaljobs--;
    });
  }
  deleteApplication(id: number) {
    this.adminService.deleteApplication(id).subscribe(() => {
      this.applications = this.applications.filter(application => application.id !== id);
      this.totalapplications--;
    });
  }
}
