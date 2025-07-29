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
  selector: 'app-company-info',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './company-info.component.html',
  styleUrl: './company-info.component.css',
})
export class CompanyInfoComponent {
  companyForm: FormGroup;
  errorMessages: string[] = [];

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.companyForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      services: [''],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password_confirmation: ['', Validators.required],
    });
  }

  successregistration() {
    this.errorMessages = [];

    if (this.companyForm.invalid) {
      this.errorMessages.push('Please fill in all required fields correctly.');
      this.companyForm.markAllAsTouched();
      return;
    }

    const form = this.companyForm.value;
    if (form.password !== form.password_confirmation) {
      this.errorMessages.push('Passwords do not match.');
      return;
    }

    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('address', form.address);
    formData.append('email', form.email);
    formData.append('services', form.services || '');
    formData.append('password', form.password);
    formData.append('password_confirmation', form.password_confirmation);

    this.auth.registerCompany(formData).subscribe({
      next: (response) => {
        if (response && response.token) {
          this.auth.storeUserSession({
            token: response.token,
            user: 'company'
          });
          window.location.href = '/companypreview';
        } else {
          this.errorMessages.push('Invalid response from server.');
        }
      },
      error: (err) => {
        if (err.error.errors) {
          const messages = Object.values(err.error.errors).flat();
          this.errorMessages = messages as string[];
        } else {
          this.errorMessages = [err.error.message || 'Unknown error occurred.'];
        }
      },
    });
  }

  get f() {
    return this.companyForm.controls;
  }
}
