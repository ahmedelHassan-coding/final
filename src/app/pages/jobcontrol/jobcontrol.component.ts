import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { JobService } from '../../services/job.service';

@Component({
  selector: 'app-jobcontrol',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './jobcontrol.component.html',
  styleUrls: ['./jobcontrol.component.css'],
})
export class JobcontrolComponent implements OnInit {
  jobForm: FormGroup;
  jobId: string | null = null;
  error: string[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private jobService: JobService,
    private router: Router
  ) {
    this.jobForm = this.fb.group({
      title: ['', Validators.required],
      location: ['', Validators.required],
      type: ['', Validators.required],
      skills: [''],
      description: ['', [Validators.required, Validators.minLength(20)]],
      requirements: ['', Validators.required],
      responsibilities: ['', Validators.required],
      min_salary: [null, [Validators.required, Validators.min(0)]],
      max_salary: [null, [Validators.min(0)]],
      experience: ['', Validators.required],
      expires_at: [''],
      published: [false],
    });
  }

  ngOnInit(): void {
    this.jobId = this.route.snapshot.paramMap.get('id');
    if (this.jobId) {
      this.jobService.getJobById(this.jobId).subscribe({
        next: (res) => this.jobForm.patchValue(res.data),
        error: (err) => console.error('Error loading job:', err),
      });
    } else {
      console.log('No job ID provided');
    }
  }

  onSubmit(): void {
    this.error = [];

    if (this.jobForm.invalid) {
      this.jobForm.markAllAsTouched();
      this.error.push('Please correct the errors in the form.');
      return;
    }

    if (this.jobId) {
      this.jobService.editjobs(this.jobId, this.jobForm.value).subscribe({
        next: () => this.router.navigate(['/jobmanagement']),
        error: (err) => {
          const errorMsg =
            err?.error?.message || 'An unexpected error occurred.';
          this.error.push(errorMsg);
        },
      });
    }
  }
}
