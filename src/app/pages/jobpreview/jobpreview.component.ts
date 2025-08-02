import { Component } from '@angular/core';
import { JobService } from '../../services/job.service';
import { FormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth-service.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  imports: [FormsModule,CommonModule],
selector: 'app-jobpreview',
  templateUrl: './jobpreview.component.html',
  styleUrl: './jobpreview.component.css'
})
export class JobpreviewComponent {

  err: string[] = [];
  successMessage = '';
  title = '';
  description = '';
  requirements = '';
  responsibilities = '';
  min_salary = null;
    max_salary= null;
    location= '';
    type= '';
    is_remote= false;
    experience= '';

  constructor(private jobService: JobService, private authService: AuthService, private router: Router) {}

  onSubmit() {
  this.err = [];
  this.successMessage = '';

  // Basic manual validation
  if (!this.title || !this.location || !this.type || !this.description || !this.requirements || 
      !this.responsibilities || !this.experience || this.min_salary == null || this.min_salary < 0) {
    this.err.push('Please fill in all required fields correctly.');
    return;
  }

  const job = {
    title: this.title.trim(),
    description: this.description.trim(),
    requirements: this.requirements.trim(),
    responsibilities: this.responsibilities.trim(),
    min_salary: this.min_salary,
    max_salary: this.max_salary,
    location: this.location.trim(),
    type: this.type,
    is_remote: this.is_remote,
    experience: this.experience.trim(),
  };

  this.jobService.storejobs(job).subscribe({
    next: () => {
      this.successMessage = 'Job posted successfully!';
      this.router.navigate(['/jobmanagement']);
    },
    error: (error) => {
      console.error('Failed to post job:', error);
      if (error?.error?.errors) {
        this.err = Object.values(error.error.errors).flatMap((val) => val as string[]);
      } else {
        this.err = ['An unexpected error occurred.'];
      }
    },
  });
}

  
  }


