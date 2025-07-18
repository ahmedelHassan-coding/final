import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { JobService } from '../../services/job.service';

@Component({
  selector: 'app-jobcontrol',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './jobcontrol.component.html',
  styleUrls: ['./jobcontrol.component.css']
})
export class JobcontrolComponent implements OnInit {
  jobForm: FormGroup;
  jobId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private jobService: JobService
  ) {
    this.jobForm = this.fb.group({
      title: [''],
      location: [''],
      type: [''],
      skills: [''],
      description: [''],
      requirements: [''],
      responsibilities: [''],
      min_salary: [''],
      max_salary: [''],
      experience: [''],
      expires_at: [''],
      is_remote: [false],
      published: [false]
    });
  }

  ngOnInit(): void {
    this.jobId = this.route.snapshot.paramMap.get('id');
    if (this.jobId) {
      this.jobService.getJobById(this.jobId).subscribe({
        next: (res) => this.jobForm.patchValue(res.data),
        error: (err) => console.error('Error loading job:', err)
      });
    }else{
      console.log('no job id');
    }

  }

  onSubmit(): void {
  if (this.jobId) {
    this.jobService.editjobs(this.jobId, this.jobForm.value).subscribe({
      next: () => alert('✅ Job updated successfully'),
      error: (err) => {
        console.error('Error:', err);
        alert('❌ Failed to update job');
      }
    });
  }
}
}
