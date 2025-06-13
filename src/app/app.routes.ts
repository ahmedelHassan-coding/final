import { Routes } from '@angular/router';
import{StudentHomeComponent} from './student-home/student-home.component';
//import { HomeComponent } from './home/home.component';
import { ErrorComponent } from './pages/error/error.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { HomeComponent } from './pages/home/home.component';
import { JobDetailsComponent } from './job-details/job-details.component';
import { JobApplicationComponent } from './job-application/job-application.component';

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
        path:'signup',
        component:SignupComponent

  },
  { 
    path: 'studenthome', 
    component: StudentHomeComponent
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





