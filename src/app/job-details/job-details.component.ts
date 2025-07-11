import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { JobService } from '../services/job.service';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  imports: [CommonModule, RouterLink],
  styleUrls: ['./job-details.component.css'],
})
export class JobDetailsComponent implements OnInit {
  job: any;

  constructor(private route: ActivatedRoute, private jobService: JobService) {}

  ngOnInit(): void {
    const jobId = this.route.snapshot.paramMap.get('id');

    // Assuming jobService.getJobById returns: { data: { ...job fields... } }
    this.jobService.getJobById(jobId).subscribe((response: any) => {
      const job = response.data;

      // Cast numeric fields to boolean if needed
      job.is_remote = Boolean(job.is_remote);
      job.published = Boolean(job.published);

      this.job = job;
    });
  }
}
