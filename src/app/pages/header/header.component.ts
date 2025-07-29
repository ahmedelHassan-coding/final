import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;
  userName: string | null = null;
  userRole: string | null = null;

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updateAuthState();
      }
    });
  }

  ngOnInit(): void {
    this.updateAuthState();
    this.userRole = localStorage.getItem('user');
  }

  updateAuthState(): void {
    this.isLoggedIn = !!localStorage.getItem('token');
    this.userName = localStorage.getItem('user_name');
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user_name');
    localStorage.removeItem('user');
    this.isLoggedIn = false;
    this.userName = null;
    window.location.href='/login';
  }
}
