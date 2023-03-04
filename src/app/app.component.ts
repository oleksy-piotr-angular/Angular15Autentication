import { Router } from '@angular/router';
import { Component, DoCheck } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements DoCheck {
  title = 'angular15_authentication';
  isMenuRequired: Boolean = false;
  constructor(private router: Router) {}
  ngDoCheck(): void {
    let currentUrl = this.router.url;
    if (currentUrl == '/login' || currentUrl == '/register') {
      this.isMenuRequired = false;
    } else {
      this.isMenuRequired = true;
    }
  }
}
