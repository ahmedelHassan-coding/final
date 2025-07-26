import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
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
  errorMessages: string[] = [];
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.graduateForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', [
        Validators.required,
        Validators.pattern(/^(010|011|012|015)[0-9]{8}$/)
      ]],
      address: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      age: ['', [
        Validators.required,
        Validators.min(1),
        Validators.max(100)
      ]],
      faculty: ['', Validators.required],
      university: ['', Validators.required],
      gender: ['', Validators.required],
      duration_track: ['', Validators.required],
      track: ['', Validators.required],
      image: [null],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password_confirmation: ['', Validators.required],
    });
  }
onPhoneInput(event: any) {
  const input = event.target;
  input.value = input.value.replace(/[^0-9]/g, '');
  this.graduateForm.get('phone')?.setValue(input.value);
}

  get f() {
    return this.graduateForm.controls;
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.graduateForm.patchValue({ image: file });
    }
  }

  successregistration() {
    this.submitted = true;
    this.errorMessages = [];

    

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
    formData.append('age', form.age);
    formData.append('faculty', form.faculty);
    formData.append('university', form.university);
    formData.append('gender', form.gender);
    formData.append('duration_track', form.duration_track);
    formData.append('track', form.track);
    formData.append('address', form.address);
    if (form.image) {
      formData.append('image', form.image);
    }

    this.auth.registerStudent(formData).subscribe({
      next: (response) => {
        if (response && response.token) {
          this.auth.storeUserSession({
            token: response.token,
            user: 'student',
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
