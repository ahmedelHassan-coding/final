import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { StudentProfileService } from '../../services/student-profile.service';

@Component({
  selector: 'app-graduateprofile',
  imports: [RouterLink],
  templateUrl: './graduateprofile.component.html',
  styleUrl: './graduateprofile.component.css',
})
export class GraduateprofileComponent {
  student: any = null; 
  skills: any[] = [];

  constructor(private studentProfileService: StudentProfileService) {}

  ngOnInit(): void {
    this.studentProfileService.getStudentProfile().subscribe({
      next: (data) => {
        this.student = data;
      },
      error: (err) => {
        console.error('Failed to load profile:', err);
      },
    });
    this.studentProfileService.getStudentSkills().subscribe({
      next: (skills) => {
        this.skills = skills;
      },
      error: (err) => {
        console.error('Failed to load skills:', err);
      },
    });
    this.studentProfileService.getStudentExperience().subscribe({
      next: (experience) => {
        this.student.experiences = experience
      },
      error: (err) => {
        console.error('Failed to load experience:', err);
      },
    });
  }
}
