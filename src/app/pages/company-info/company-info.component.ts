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
  selector: 'app-company-info',
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './company-info.component.html',
  styleUrl: './company-info.component.css',
})
export class CompanyInfoComponent {
  companyForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.companyForm = this.fb.group({
      name: [''],
      email: [''],
      address: [''],
      services: [''],
      password: [''],
      password_confirmation: [''],
    });
  }
  errorMessages: string[] = [];


  successregistration() {
    this.errorMessages = [];
    if (this.companyForm.invalid) {
      this.errorMessages.push('Please fill in required fields.');
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
    formData.append('services', form.services);
    formData.append('password', form.password);
    formData.append('password_confirmation', form.password_confirmation);

    this.auth.registerCompany(formData).subscribe({
      next: (response) => {
        // Add null check for response and token
        if (response && response.token) {
          // Use auth service method for consistent token storage
          this.auth.storeUserSession({
            token: response.token,
            user: { user_type: 'company' }
          });
          
          this.router.navigate(['/companyprofile']);
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
