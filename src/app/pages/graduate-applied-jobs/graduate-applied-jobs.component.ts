import { Component } from '@angular/core';
import { JobService } from '../../services/job.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-graduate-applied-jobs',
  imports: [CommonModule],
  templateUrl: './graduate-applied-jobs.component.html',
  styleUrl: './graduate-applied-jobs.component.css'
})
export class GraduateAppliedJobsComponent {
  appliedJobs: any[] = [];
  constructor(private jobService: JobService) {
    this.jobService.getJobApplications().subscribe((data) => {
      this.appliedJobs = data;
      console.log(this.appliedJobs);
    });
  }
  cancelApplication(id: number) {
    this.jobService.cancelApplication(id).subscribe((data) => {
      console.log(data);
      this.appliedJobs = this.appliedJobs.filter((job) => job.id !== id);
    });
  }


}
