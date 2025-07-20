import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { JobService } from '../services/job.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-job-application',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './job-application.component.html',
  styleUrls: ['./job-application.component.css'],
})
export class JobApplicationComponent implements OnInit {
  error:string[] = [];

  formData = {
    message: '',
  };
  selectedFile: File | null = null;
  fileInputError: boolean = false;

  constructor(private route: ActivatedRoute, private jobService: JobService, private router: Router) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    // Uncomment the next line for debugging only
    // console.log('Job ID:', id);
  }

  handleFileInput(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  onSubmit() {
    const jobIdParam = this.route.snapshot.paramMap.get('id');
    const jobId = +jobIdParam!;

    if (!jobId || isNaN(jobId)) {
      this.error.push('Invalid job ID.');
      return;
    }

    const formData = new FormData();
    formData.append('cover_letter', this.formData.message);

    if (this.selectedFile instanceof File) {
      formData.append('cv', this.selectedFile, this.selectedFile.name);
      this.fileInputError = false;
    } else {
      this.fileInputError = true;
      this.error.push('Please upload a valid CV file.');
      return;
    }

    this.jobService.submitApplication(jobId, formData)
      .pipe(take(1))
      .subscribe({
        next: (res) => {
          this.router.navigate(['/graduate-applied-jobs']);
        },
        error: (err) => {
          console.error('Submission error:', err);
          this.error.push(err.error.message);
        },
      });
  }
}

