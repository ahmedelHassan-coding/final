import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-job-application',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './job-application.component.html',
  styleUrls: ['./job-application.component.css'],
})
export class JobApplicationComponent implements OnInit {
  jobId!: string;

  formData = {
    name: '',
    email: '',
    message: '',
  };

  selectedFile: File | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    console.log('Job ID:', id); 
  }

  handleFileInput(event: any): void {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      this.selectedFile = file;
    } else {
      alert('من فضلك اختر ملف PDF فقط');
      event.target.value = '';
    }
  }

  submitApplication(): void {
    if (!this.selectedFile) {
      alert('يرجى رفع السيرة الذاتية أولاً');
      return;
    }

    const formPayload = new FormData();
    formPayload.append('name', this.formData.name);
    formPayload.append('email', this.formData.email);
    formPayload.append('message', this.formData.message);
    formPayload.append('cv', this.selectedFile);
    formPayload.append('jobId', this.jobId);

    alert('تم إرسال طلب التقديم بنجاح!');
  }
}
