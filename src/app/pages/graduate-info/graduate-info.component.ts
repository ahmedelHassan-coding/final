import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GraduateprofileComponent } from '../graduateprofile/graduateprofile.component';

@Component({
  selector: 'app-graduate-info',
  imports: [RouterLink],
  templateUrl: './graduate-info.component.html',
  styleUrl: './graduate-info.component.css'
})
export class GraduateInfoComponent {

  successregistration() {
    alert("Your Info has been submitted successfully")
    
  }

}
