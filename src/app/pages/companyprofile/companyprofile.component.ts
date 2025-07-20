import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router,ActivatedRoute, RouterLink } from '@angular/router';
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
  selectedImageName: string = '';
  selectedCoverImageName: string = '';
  isSubmitting: boolean = false;

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

  validateFile(file: File): { isValid: boolean; error?: string } {
    // Check file size (5MB = 5 * 1024 * 1024 bytes)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      return { isValid: false, error: 'File size must be less than 5MB' };
    }

    // Check file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      return { isValid: false, error: 'Only JPEG, PNG, and GIF files are allowed' };
    }

    return { isValid: true };
  }

  onFileChange(event: any, field: string) {
    const file = event.target.files[0];
    if (file) {
      const validation = this.validateFile(file);
      
      if (!validation.isValid) {
        this.errorMessages = [validation.error!];
        // Clear the file input
        event.target.value = '';
        return;
      }

      this.companyForm.patchValue({ [field]: file });
      
      // Update the selected file name for display
      if (field === 'image') {
        this.selectedImageName = file.name;
      } else if (field === 'cover_image') {
        this.selectedCoverImageName = file.name;
      }

      // Clear any previous file-related errors
      this.errorMessages = this.errorMessages.filter(error => 
        !error.includes('File size') && !error.includes('Only JPEG')
      );
    }
  }

  onSubmit() {
    this.errorMessages = [];
    this.isSubmitting = true;

    // Create FormData for file upload
    const formData = new FormData();

    // Get form values excluding files
    const formValues = this.companyForm.value;

    // Add non-file fields to FormData
    if (formValues.name) formData.append('name', formValues.name);
    if (formValues.specialization) formData.append('specialization', formValues.specialization);
    if (formValues.type) formData.append('type', formValues.type);
    if (formValues.team_size) formData.append('team_size', formValues.team_size);
    if (formValues.founded) formData.append('founded', String(formValues.founded));
    if (formValues.country) formData.append('country', formValues.country);
    if (formValues.address) formData.append('address', formValues.address);
    if (formValues.about) formData.append('about', formValues.about);
    if (formValues.email) formData.append('email', formValues.email);
    if (formValues.phone) formData.append('phone', formValues.phone);
    if (formValues.website) formData.append('website', formValues.website);
    if (formValues.facebook) formData.append('facebook', formValues.facebook);
    if (formValues.linkedin) formData.append('linkedin', formValues.linkedin);
    if (formValues.instagram) formData.append('instagram', formValues.instagram);

    // Get file objects directly from form controls
    const imageFile = this.companyForm.get('image')?.value;
    const coverImageFile = this.companyForm.get('cover_image')?.value;

    // Add files to FormData
    if (imageFile) {
      formData.append('image', imageFile);
    }
    if (coverImageFile) {
      formData.append('cover_image', coverImageFile);
    }


    this.companyProfileService.updateCompanyData(formData).subscribe({
      next: (response) => {
      
        this.isSubmitting = false;
        this.router.navigate(['/companypreview']);
      },
      error: (err) => {
        this.isSubmitting = false;
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
