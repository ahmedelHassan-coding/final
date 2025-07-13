import { Component } from '@angular/core';
import { JobService } from '../../services/job.service';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth-service.service';
import { CommonModule } from '@angular/common';
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

  constructor(private jobService: JobService, private authService: AuthService) {}

  onSubmit() {

        this.err = [];
     this.successMessage = '';
    const job = {
      title: this.title,
      description: this.description,
      requirements: this.requirements,
      responsibilities: this.responsibilities,
      min_salary: this.min_salary,
      max_salary: this.max_salary,
      location: this.location,
      type: this.type,
      is_remote: this.is_remote,
      experience: this.experience,
    };
this.jobService.storejobs(job).subscribe({
  next: () => {
    this.successMessage = 'Job posted successfully!';
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
