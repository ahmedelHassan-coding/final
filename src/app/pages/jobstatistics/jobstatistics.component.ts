import { Component } from '@angular/core';
import { JobService } from '../../services/job.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-jobstatistics',
  imports: [CommonModule,RouterLink],
  templateUrl: './jobstatistics.component.html',
  styleUrl: './jobstatistics.component.css'
})
export class JobstatisticsComponent {

  id: any;
  applications: any;
  message: any[] = [];
  constructor(private jobService: JobService, private route: ActivatedRoute) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.jobService.getCompanyJobApplications(this.id).subscribe((data) => {
      this.applications = data.data;
      console.log(this.applications);
    });
  }
  acceptApplication(id: number) {
    this.jobService.updateApplicationStatus(id, { status: 'accepted' }).subscribe((data) => {
       this.message.push('Application accepted successfully');
      console.log(data);
    });
  }
  rejectApplication(id: number) {
    this.jobService.updateApplicationStatus(id, { status: 'rejected' }).subscribe((data) => {
       this.message.push('Application rejected ');
      console.log(data);
    });
  }
}
