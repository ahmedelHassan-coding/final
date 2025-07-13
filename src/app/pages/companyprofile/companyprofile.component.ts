import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CompanyProfileService } from '../../services/company-profile.service';

@Component({
  selector: 'app-company-profile',
  imports: [RouterLink],
  templateUrl: './companyprofile.component.html',
  styleUrls: ['./companyprofile.component.css']
})
export class CompanyprofileComponent implements OnInit {
  company: any;
  isOwnProfile: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private CompanyProfileService: CompanyProfileService
  ) {}

  ngOnInit(): void {
    const urlId = this.route.snapshot.paramMap.get('id');

    if (urlId) {
      // Student viewing a company
      this.isOwnProfile = false;
      this.CompanyProfileService.getCompanyById(urlId).subscribe({
        next: (data) => this.company = data.data,
        error: (err) => console.error('Error fetching company by ID', err)
      });
    } else {
      // Logged-in company viewing own profile
      this.isOwnProfile = true;
      this.CompanyProfileService.getCompany().subscribe({
        next: (data) => this.company = data.data,
        error: (err) => console.error('Error fetching company by auth', err)
      });
    }
  }
}
