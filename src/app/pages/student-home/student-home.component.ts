import { Component, OnInit } from '@angular/core';
import { JobService } from '../../services/job.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-student-home',
  standalone: true,

  imports: [CommonModule,RouterLink],
  templateUrl: './student-home.component.html',
  styleUrl: './student-home.component.css',
})
export class StudentHomeComponent implements OnInit {
  jobs: any[] = [];
  paginatedJobs: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 0;

  constructor(private jobService: JobService) {}

  ngOnInit(): void {
    this.jobService.getJobs().subscribe({
      next: (data) => {
        this.jobs = data.data;
        this.totalPages = Math.ceil(this.jobs.length / this.itemsPerPage);
        this.updatePaginatedJobs();
      },
      error: (err) => console.error('error getting data', err),
    });
  }

  updatePaginatedJobs(): void {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedJobs = this.jobs.slice(start, end);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePaginatedJobs();
    }
  }

  parseQualifications(qualStr: string): string[] {
    try {
      return JSON.parse(qualStr);
    } catch {
      return [];
    }
  }
  get visiblePages(): (number | string)[] {
    const pages: (number | string)[] = [];
    const total = this.totalPages;

    if (total <= 5) {
      for (let i = 1; i <= total; i++) pages.push(i);
      return pages;
    }

    pages.push(1);

    if (this.currentPage > 3) pages.push('...');

    const start = Math.max(2, this.currentPage - 1);
    const end = Math.min(total - 1, this.currentPage + 1);

    for (let i = start; i <= end; i++) pages.push(i);

    if (this.currentPage < total - 2) pages.push('...');

    pages.push(total);

    return pages;
  }
}

