import { Routes } from '@angular/router';
 import{StudentHomeComponent} from './student-home/student-home.component';
import { HomeComponent } from './home/home.component';
import { JobDetailsComponent } from './job-details/job-details.component';
import { JobApplicationComponent } from './job-application/job-application.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'studenthome', component: StudentHomeComponent },
  { path: 'job/:id', component: JobDetailsComponent },
  { path: 'apply/:id', component: JobApplicationComponent },

  { path: '**', component: HomeComponent },
];
