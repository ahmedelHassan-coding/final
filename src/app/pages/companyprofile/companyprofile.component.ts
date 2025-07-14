import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CompanyProfileService } from '../../services/company-profile.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-company-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, RouterLink],
  templateUrl: './companyprofile.component.html',
  styleUrls: ['./companyprofile.component.css'],
})
export class CompanyprofileComponent {
  companyForm: FormGroup;
  errorMessages: string[] = [];

  constructor(
    private fb: FormBuilder,
    private companyProfileService: CompanyProfileService,
    private router: Router
  ) {
    this.companyForm = this.fb.group({
      name: [''],
      specialization: [''],
      type: [''],
      team_size: [''],
      founded: [''],
      country: [''],
      address: [''],
      about: [''],
      email: [''],
      phone: [''],
      website: [''],
      facebook: [''],
      linkedin: [''],
      instagram: [''],
      image: [null],
      cover_image: [null],
    });
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

  onSubmit() {
    this.errorMessages = [];

    const form = this.companyForm.value;

    // Send as JSON - only send non-empty values
    const jsonData: any = {};

    if (form.name) jsonData.name = form.name;
    if (form.specialization) jsonData.specialization = form.specialization;
    if (form.type) jsonData.type = form.type;
    if (form.team_size) jsonData.team_size = form.team_size;
    if (form.founded)
      jsonData.founded = form.founded ? String(form.founded) : '';
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
        console.log('Form data sent:', form);
        console.log('Backend response:', response);
        console.log('Company updated successfully', response);
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
