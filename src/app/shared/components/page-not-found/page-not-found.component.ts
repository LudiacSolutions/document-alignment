import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-page-not-found',
  imports: [],
  templateUrl: './page-not-found.component.html',
  styleUrl: './page-not-found.component.css'
})
export class PageNotFoundComponent {
  currentUrl: string = '';
 
  constructor(
    private router: Router,
    private location: Location
  ) {
    this.currentUrl = this.router.url;
  }
 
  goHome() {
    this.router.navigate(['/']);
  }
 
  goBack() {
    this.location.back();
  }
 
  searchSite() {
    // Implement search functionality
    console.log('Search functionality');
  }
 
  reportIssue() {
    // Implement issue reporting
    console.log('Report issue');
  }
}
