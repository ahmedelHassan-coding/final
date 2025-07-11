import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'; 
import { AuthService } from '../../../services/auth-service.service';

@Component({
  selector: 'app-company-login-component',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './company-login-component.component.html',
  styleUrls: ['./company-login-component.component.css'],
})
export class CompanyLoginComponentComponent {
  loginForm: FormGroup;
  errorMessages: string[] = [];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onLogin() {
    this.errorMessages = [];

    if (this.loginForm.invalid) {
      this.errorMessages.push('Please enter valid email and password.');
      return;
    }

    const { email, password } = this.loginForm.value;

    this.authService.companyLogin({ email, password }).subscribe({
      next: (res) => {
        // Assuming token is in res.token
        localStorage.setItem('token', res.token);
        this.router.navigate(['/companyprofile']);
      },
      error: (err) => {
        if (err.error?.message) {
          this.errorMessages.push(err.error.message);
        } else {
          this.errorMessages.push('Login failed. Please try again.');
        }
      },
    });
  }
}
