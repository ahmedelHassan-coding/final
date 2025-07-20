import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { JobService } from '../../services/job.service';

@Component({
  selector: 'app-jobmanagement',
  imports: [RouterLink, CommonModule],
  templateUrl: './jobmanagement.component.html',
  styleUrl: './jobmanagement.component.css'
})
export class JobmanagementComponent {
  jobs: any[] = [];
  statistics: any;
  message: string[] = [];
  errorMessages: string[] = [];
  deletingJobId: number | null = null;

  constructor(private jobService: JobService) {
    this.jobService.getCompanyJobs().subscribe((data) => {
      this.jobs = data.jobs;
      this.statistics = data.total_applications;
    });
  }

  deleteJob(id: number) {
    // Ask for user confirmation
    if (!confirm('Are you sure you want to delete this job? This action cannot be undone.')) {
      return;
    }

    // Set loading state
    this.deletingJobId = id;
    this.clearMessages();

    this.jobService.deletejob(id).subscribe({
      next: (data) => {
        this.jobs = this.jobs.filter((job) => job.id !== id);
        
        this.message.push(data.message || 'Job deleted successfully');
        
        this.statistics = this.jobs.length;
        
      },
      error: (error) => {
        
        // Show error message to user
        if (error.error?.message) {
          this.errorMessages.push(error.error.message);
        } else if (error.status === 404) {
          this.errorMessages.push('Job not found or already deleted.');
        } else if (error.status === 403) {
          this.errorMessages.push('You do not have permission to delete this job.');
        } else {
          this.errorMessages.push('Failed to delete job. Please try again.');
        }
      },
      complete: () => {
        // Clear loading state
        this.deletingJobId = null;
      }
    });
  }

  private clearMessages() {
    this.message = [];
    this.errorMessages = [];
  }

  isDeleting(jobId: number): boolean {
    return this.deletingJobId === jobId;
  }
}
