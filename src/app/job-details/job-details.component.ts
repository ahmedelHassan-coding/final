import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { JobService } from '../services/job.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  imports: [CommonModule,RouterLink],
  styleUrls: ['./job-details.component.css'],
})
export class JobDetailsComponent implements OnInit {
  job: any;

  constructor(private route: ActivatedRoute, private jobService: JobService) {}

  ngOnInit(): void {
    const jobId = this.route.snapshot.paramMap.get('id');
    this.jobService.getJobs().subscribe((jobs) => {
      const foundJob = jobs.find((j: any) => j.id === jobId);
      if (foundJob) {
        try {
          foundJob.qualifications = JSON.parse(foundJob.qualifications);
        } catch {
          foundJob.qualifications = [];
        }
      }
      this.job = foundJob;
    });
  }
}
