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

}
