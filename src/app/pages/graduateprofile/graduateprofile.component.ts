import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { StudentProfileService } from '../../services/student-profile.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-graduateprofile',
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './graduateprofile.component.html',
  styleUrl: './graduateprofile.component.css',
})
export class GraduateprofileComponent {
  @ViewChild('skillInput') skillInputRef!: ElementRef<HTMLInputElement>;
  student: any = null; 
  skills: any[] = [];
  newSkill = '';
  editMode = false;

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
  loadSkills(): void {
    this.studentProfileService.getStudentSkills().subscribe({
      next: (res: any[]) => (this.skills = res),
      error: (err: any) => console.error(err),
    });
  }

  addSkill(): void {
    const name = this.newSkill.trim();
    if (!name) return;

    this.studentProfileService.addSkill(name).subscribe({
      next: () => {
        this.newSkill = '';
        this.loadSkills();
        setTimeout(() => this.skillInputRef?.nativeElement.focus(), 0);
      },
      error: err => console.error('Failed to add skill:', err),
    });
  }

  deleteSkill(id: number): void {
    this.studentProfileService.deleteSkill(id).subscribe({
      next: () => this.loadSkills(),
      error: (err: any) => console.error(err),
    });
  }

  focusSkillInput(): void {
    this.editMode = !this.editMode;
    if (this.editMode) {
      setTimeout(() => {
        this.skillInputRef?.nativeElement.focus();
      }, 0);
    }
  }
}
