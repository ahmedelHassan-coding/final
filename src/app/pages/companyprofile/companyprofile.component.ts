import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'; // added Validators
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { CompanyProfileService } from '../../services/company-profile.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-company-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './companyprofile.component.html',
  styleUrls: ['./companyprofile.component.css'],
})
export class CompanyprofileComponent implements OnInit {
  companyForm: FormGroup;
  errorMessages: string[] = [];
  submitted = false; // added to track form submission

  constructor(
    private fb: FormBuilder,
    private companyProfileService: CompanyProfileService,
    private router: Router
  ) {
    this.companyForm = this.fb.group({
      name: ['', Validators.required],
      specialization: ['', Validators.required],
      type: ['', Validators.required],
      team_size: ['', Validators.required],
      founded: ['', Validators.required],
      country: ['', Validators.required],
      address: ['', Validators.required],
      about: ['', [Validators.required, Validators.minLength(20)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[\d\+\-\s]{8,}$/), Validators.minLength(11), Validators.maxLength(11)]],
      // website: ['', [Validators.required, Validators.pattern(/^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w- ./?%&=]*)?$/)]],
      facebook: ['', [this.websiteValidator]],
      linkedin: ['', [this.websiteValidator]],
      instagram: ['', [this.websiteValidator]],
      image: [null],
      cover_image: [null],
    });
  }

  get f() {
    return this.companyForm.controls;
  }

  ngOnInit() {
    this.loadCompanyData();
  }

  loadCompanyData() {
    this.companyProfileService.getCompany().subscribe(
      (res: any) => {
        this.companyForm.patchValue(res.company || res.data || res);
      },
      (err) => {
        console.error('Error loading company data', err);
      }
    );
  }

  onFileChange(event: any, field: string) {
    const file = event.target.files[0];
    if (file) {
      this.companyForm.patchValue({ [field]: file });
    }
  }

  // Custom website URL validator
  websiteValidator(control: import('@angular/forms').AbstractControl) {
    if (!control.value) return null;
    const pattern = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/i;
    return pattern.test(control.value) ? null : { website: true };
  }

  onSubmit() {
    this.submitted = true; // track that submit was attempted
    this.errorMessages = [];

    if (this.companyForm.invalid) {
      return; // prevent submission if invalid
    }

    const form = this.companyForm.value;
    const jsonData: any = {};

    if (form.name) jsonData.name = form.name;
    if (form.specialization) jsonData.specialization = form.specialization;
    if (form.type) jsonData.type = form.type;
    if (form.team_size) jsonData.team_size = form.team_size;
    if (form.founded) jsonData.founded = String(form.founded);
    if (form.country) jsonData.country = form.country;
    if (form.address) jsonData.address = form.address;
    if (form.about) jsonData.about = form.about;
    if (form.email) jsonData.email = form.email;
    if (form.phone) jsonData.phone = form.phone;
    if (form.website) jsonData.website = form.website;
    if (form.facebook) jsonData.facebook = form.facebook;
    if (form.linkedin) jsonData.linkedin = form.linkedin;
    if (form.instagram) jsonData.instagram = form.instagram;

    this.companyProfileService.updateCompanyData(jsonData).subscribe({
      next: (response) => {
        this.router.navigate(['/companypreview']);
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
