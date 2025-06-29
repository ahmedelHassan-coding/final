import { Routes } from '@angular/router';
//import { HomeComponent } from './home/home.component';
import { ErrorComponent } from './pages/error/error.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { HomeComponent } from './pages/home/home.component';
import { CompanyInfoComponent } from './pages/company-info/company-info.component';
import { GraduateInfoComponent } from './pages/graduate-info/graduate-info.component';
import { JobDetailsComponent } from './job-details/job-details.component';
import { JobApplicationComponent } from './job-application/job-application.component';
import { GraduateprofileComponent } from './pages/graduateprofile/graduateprofile.component';
import { CompanyprofileComponent } from './pages/companyprofile/companyprofile.component';
import { StudentHomeComponent } from './pages/student-home/student-home.component';
import { AdmindashboardComponent } from './pages/admindashboard/admindashboard.component';



export const routes: Routes = [
  { 
      path:'',
      redirectTo:'home',
      pathMatch:'full'
  },
  {
        path:'home',
        component:HomeComponent

  },
  {
        path:'login',
        component:LoginComponent

  },
  {
        path:'company-info',
        component:CompanyInfoComponent

  },
  { 
    path: 'companyprofile', 
    component: CompanyprofileComponent
  },
  {
    path:'graduate-info',
    component:GraduateInfoComponent

  },
  { 
    path: 'graduateprofile', 
    component: GraduateprofileComponent
  },
  {
    path:'signup',
    component:SignupComponent

  },
  { 
    path: 'student-home', 
    component: StudentHomeComponent
  },
  { 
    path: 'admindashboard', 
    component: AdmindashboardComponent
  },
  { 
    path: 'job/:id', 
    component: JobDetailsComponent
  },
  { 
    path: 'apply/:id', 
    component: JobApplicationComponent },

  { 
    path:'**',
    component:ErrorComponent
  },
];





