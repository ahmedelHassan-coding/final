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
  constructor(private jobService: JobService) {
    this.jobService.getCompanyJobs().subscribe((data) => {
      this.jobs = data.data;
    });
  }

}
