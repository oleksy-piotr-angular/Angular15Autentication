import { AuthService } from './service/auth.service';
import { Router } from '@angular/router';
import { Component, DoCheck } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements DoCheck {
  title = 'angular15_authentication';
  isMenuRequired: boolean = false;
  isAdminUser: boolean = false;
  constructor(private router: Router, private authService: AuthService) {}
  ngDoCheck(): void {
    let currentUrl = this.router.url;
    if (currentUrl == '/login' || currentUrl == '/register') {
      this.isMenuRequired = false;
    } else {
      this.isMenuRequired = true;
    }
    if (this.authService.getUserRole() === 'admin') {
      this.isAdminUser = true;
    } else {
      this.isAdminUser = false;
    }
  }
}
