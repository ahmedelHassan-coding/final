import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, HttpClientModule, withInterceptors } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { importProvidersFrom } from '@angular/core';
import { authInterceptor } from './app/auth.interceptor';
bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    importProvidersFrom(HttpClientModule),
  ],
}).catch((err) => console.error(err));
