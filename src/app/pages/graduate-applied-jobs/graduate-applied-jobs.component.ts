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
  message:string[] = [];
  constructor(private jobService: JobService) {
    this.jobService.getJobApplications().subscribe((data) => {
      this.appliedJobs = data;
      console.log(this.appliedJobs);
    });
  }
  cancelApplication(id: number) {
    this.jobService.cancelApplication(id).subscribe((data) => {
      this.appliedJobs = this.appliedJobs.filter((job) => job.id !== id);
    });
  }
  completeApplication(id: number) {
    this.jobService.completeApplication(id).subscribe({
      next: (response) => {
        // Update the application status in the local array
        const jobIndex = this.appliedJobs.findIndex(job => job.id === id);
        if (jobIndex !== -1) {
          this.appliedJobs[jobIndex].status = 'completed';
          this.message.push(response.message);
        }
      },
      error: (error) => {
        this.message.push(error.error.message);
      }
    });
  }

}
