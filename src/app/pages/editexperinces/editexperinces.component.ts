import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StudentProfileService } from '../../services/student-profile.service';

interface StudentExperience {
  id?: number;
  job_title: string;
  company_name: string;
  start_date: string;
  end_date: string;
}

@Component({
  selector: 'app-editexperinces',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './editexperinces.component.html',
  styleUrl: './editexperinces.component.css'
})
export class EditexperincesComponent {
  experience: StudentExperience = { job_title: '', company_name: '', start_date: '', end_date: '' };
  experiences: StudentExperience[] = [];
  editExperience: StudentExperience | null = null; // <-- فورم التعديل
  showEditFormId: number | null = null;  
  error:string[] = [];

  constructor(private studentProfileService: StudentProfileService) {
    this.getStudentExperience();
  }

  getStudentExperience() {
    this.studentProfileService.getStudentExperience().subscribe((data: StudentExperience[]) => {
      this.experiences = data;
    });
  }

  storeStudentExperience() {
    this.studentProfileService.storeStudentExperience(this.experience).subscribe(() => {
      this.experience = { job_title: '', company_name: '', start_date: '', end_date: '' };
      this.getStudentExperience();
    });
  }

  openEditForm(exp: StudentExperience) {
    this.editExperience = { ...exp }; // انسخ الداتا للفورم
    this.showEditFormId = exp.id!;
  }

  updateExperience(id: number): void {
    if (!this.editExperience) return;
  
    const updatedData: StudentExperience = {
      job_title: this.editExperience.job_title.trim(),
      company_name: this.editExperience.company_name.trim(),
      start_date: this.editExperience.start_date.trim(),
      end_date: this.editExperience.end_date.trim()
    };
  
    // Optional: Check for empty fields before updating
    if (
      !updatedData.job_title ||
      !updatedData.company_name ||
      !updatedData.start_date ||
      !updatedData.end_date
    ) {
      this.error.push('All fields are required.');
      return;
    }
  
    this.studentProfileService.updateStudentExperience(id, updatedData).subscribe({
      next: () => {
        this.editExperience = null;
        this.showEditFormId = null;
        this.getStudentExperience();
      },
      error: (err) => {
        console.error('Update failed:', err);
        this.error.push(err.error.message);
      }
    });
  }
  
  deleteExperience(id: number) {
    this.studentProfileService.deleteStudentExperience(id).subscribe(() => {
      this.experiences = this.experiences.filter(exp => exp.id !== id);
    });
  }

  cancelEdit() {
    this.editExperience = null;
    this.showEditFormId = null;
  }
}
