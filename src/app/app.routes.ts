import { Routes } from '@angular/router';
//import { HomeComponent } from './home/home.component';
import { ErrorComponent } from './pages/error/error.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutgtsComponent } from './pages/aboutgts/aboutgts.component';
import { TechnicaltracksComponent } from './pages/technicaltracks/technicaltracks.component';
import { PartenersComponent } from './pages/parteners/parteners.component';
import { ContactusComponent } from './pages/contactus/contactus.component';
import { CompanyInfoComponent } from './pages/company-info/company-info.component';
import { GraduateInfoComponent } from './pages/graduate-info/graduate-info.component';
import { JobDetailsComponent } from './job-details/job-details.component';
import { JobApplicationComponent } from './job-application/job-application.component';
import { GraduateprofileComponent } from './pages/graduateprofile/graduateprofile.component';
import { CompanyprofileComponent } from './pages/companyprofile/companyprofile.component';
import { StudentHomeComponent } from './pages/student-home/student-home.component';
import { AdmindashboardComponent } from './pages/admindashboard/admindashboard.component';
import { CompanypreviewComponent } from './pages/companypreview/companypreview.component';
import { JobpreviewComponent } from './pages/jobpreview/jobpreview.component';
import { JobcontrolComponent } from './pages/jobcontrol/jobcontrol.component';
import { EditskillsComponent } from './pages/editskills/editskills.component';
import { EditexperincesComponent } from './pages/editexperinces/editexperinces.component';
import { GraduateAppliedJobsComponent } from './pages/graduate-applied-jobs/graduate-applied-jobs.component';
import { JobmanagementComponent } from './pages/jobmanagement/jobmanagement.component';
import { JobstatisticsComponent } from './pages/jobstatistics/jobstatistics.component';



export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'aboutgts',
    component: AboutgtsComponent,
  },
  {
    path: 'technicaltracks',
    component: TechnicaltracksComponent,
  },
  {
    path: 'parteners',
    component: PartenersComponent,
  },
  {
    path: 'contactus',
    component: ContactusComponent,
  },/////////////////////////////////////////////////////////////////////////////////////////////////////////////
  {
    path: 'login',
    component: LoginComponent,
  },

  {
    path: 'company-info',
    component: CompanyInfoComponent,
  },
  {
    path: 'companyprofile',
    component: CompanyprofileComponent,
  },
  {
    path: 'companypreview',
    component: CompanypreviewComponent,
  },
  {
    path: 'companypreview/:id',
    component: CompanypreviewComponent,
  },
  {
    path: 'jobpreview',
    component: JobpreviewComponent,
  },
  {
    path: 'jobcontrol',
    component: JobcontrolComponent,
  },
  {
    path: 'jobmanagement',
    component: JobmanagementComponent,
  },
  {
    path: 'jobstatistics',
    component: JobstatisticsComponent,
  },
  
  
  ////////////////////////////////////////////////////////////
  {
    path: 'graduate-info',
    component: GraduateInfoComponent,
  },
  {
    path: 'graduateprofile',
    component: GraduateprofileComponent,
  },
  {
    path: 'editskills',
    component: EditskillsComponent,
  },
  {
    path: 'editexperinces',
    component: EditexperincesComponent,
  },
  {
    path: 'graduate-applied-jobs',
    component: GraduateAppliedJobsComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'student-home',
    component: StudentHomeComponent,
  },
  {
    path: 'admindashboard',
    component: AdmindashboardComponent,
  },
  {
    path: 'job/:id',
    component: JobDetailsComponent,
  },
  {
    path: 'apply/:id',
    component: JobApplicationComponent,
  },

  {
    path: '**',
    component: ErrorComponent,
  },
];





