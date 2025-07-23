import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CompanyProfileService } from '../../services/company-profile.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-companypreview',
  imports: [RouterLink],
templateUrl: './companypreview.component.html',
  styleUrl: './companypreview.component.css'
})
export class CompanypreviewComponent {
  company: any;
  isOwnProfile: boolean = false;
  user: any;
  constructor(
    private route: ActivatedRoute,
    private CompanyProfileService: CompanyProfileService
  ) {}

  ngOnInit(): void {
    const urlId = this.route.snapshot.paramMap.get('id');
    this.user=localStorage.getItem('user');

    if (urlId) {
      // Student viewing a company
      this.isOwnProfile = false;
      this.CompanyProfileService.getCompanyById(urlId).subscribe({
        next: (data) => this.company = data.data,
        error: (err) => console.error('Error fetching company by ID', err)
      });
    } else {
      this.isOwnProfile = true;
      this.CompanyProfileService.getCompany().subscribe({
        next: (data) => this.company = data.data,
        error: (err) => console.error('Error fetching company by auth', err)
      });
    }
  }

}
