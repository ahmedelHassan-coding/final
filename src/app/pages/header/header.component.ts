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

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updateAuthState();
      }
    });
  }

  ngOnInit(): void {
    this.updateAuthState();
  }

  updateAuthState(): void {
    this.isLoggedIn = !!localStorage.getItem('token');
    this.userName = localStorage.getItem('user_name');
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user_name');
    this.isLoggedIn = false;
    this.userName = null;
    this.router.navigate(['/login']);
  }
}
