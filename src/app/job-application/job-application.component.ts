import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { JobService } from '../services/job.service';

@Component({
  selector: 'app-job-application',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './job-application.component.html',
  styleUrls: ['./job-application.component.css'],
})
export class JobApplicationComponent implements OnInit {
  jobId!: string;

  formData = {
    name: '',
    email: '',
    message: '',
    // file: null as File | null,
  };

  selectedFile: File | null = null;

  constructor(private route: ActivatedRoute, private jobService: JobService) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    console.log('Job ID:', id);
  }

  handleFileInput(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  submitApplication() {
    // const userId = this.authService.getUserId();
    const jobId = this.route.snapshot.paramMap.get('id');

    const formData = new FormData();
    formData.append('name', this.formData.name);
    formData.append('email', this.formData.email);
    formData.append('message', this.formData.message);
    formData.append('jobId', jobId ?? '');

    // if (this.selectedFile) {
    //   formData.append('resume', this.selectedFile, this.selectedFile.name);
    // }

    this.jobService.submitApplication(formData).subscribe({
      next: (res) => {
        console.log(' Application submitted', res);
        alert('Application submitted successfully!');
      },
      error: (err) => {
        console.error(' Submission error:', err);
        alert('Failed to submit application.');
      },
    });
  }
}
