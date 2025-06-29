import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-company-info',
  imports: [RouterLink],
  templateUrl: './company-info.component.html',
  styleUrl: './company-info.component.css'
})
export class CompanyInfoComponent {
  successregistration() {
    alert("Your Info has been submitted successfully")
    
  }

}
