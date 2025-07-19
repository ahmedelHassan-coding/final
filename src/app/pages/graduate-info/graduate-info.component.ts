import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth-service.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'; 


@Component({
  selector: 'app-graduate-info',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],

  templateUrl: './graduate-info.component.html',
  styleUrls: ['./graduate-info.component.css'],
})
export class GraduateInfoComponent {
  graduateForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.graduateForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: [''],
      address: [''],
      email: ['', [Validators.required, Validators.email]],
      age: [''],
      faculty: [''],
      university: [''],
      gender: [''],
      durationTrack: [''],
      track: [''],
      interests: [''],
      image: [null],
      password: ['', Validators.required],
      password_confirmation: ['', Validators.required],
    });
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.graduateForm.patchValue({ image: file });
    }
  }

  errorMessages: string[] = [];

  successregistration() {
    this.errorMessages = [];

    if (this.graduateForm.invalid) {
      this.errorMessages.push('Please fill in required fields.');
      return;
    }

    const form = this.graduateForm.value;

    if (form.password !== form.password_confirmation) {
      this.errorMessages.push('Passwords do not match.');
      return;
    }

    const formData = new FormData();
    formData.append('name', `${form.firstName} ${form.lastName}`);
    formData.append('email', form.email);
    formData.append('password', form.password);
    formData.append('password_confirmation', form.password_confirmation);
    formData.append('phone', form.phone);
    formData.append('address', form.address);
    formData.append('age', form.age);
    formData.append('faculty', form.faculty);
    formData.append('university', form.university);
    formData.append('gender', form.gender);
    formData.append('track', form.track);
    formData.append('duration_track', form.durationTrack);
    if (form.image) {
      formData.append('image', form.image);
    }

    this.auth.registerStudent(formData).subscribe({
      next: (response) => {
        // Add null check for response and token
        if (response && response.token) {
          // Use auth service method for consistent token storage
          this.auth.storeUserSession({
            token: response.token,
            user: 'student'
          });
          
          this.router.navigate(['/graduateprofile']);
        } else {
          this.errorMessages.push('Invalid response from server. Please try again.');
        }
      },
      error: (err) => {
        if (err.error.errors) {
          const messages = Object.values(err.error.errors).flat();
          this.errorMessages = messages as string[];
        } else {
          this.errorMessages = [err.error.message || 'Unknown error'];
        }
      },
    });
  }
}

