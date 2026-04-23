import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private router: Router) {}

  // ✅ Simply navigate (no ID needed here)
  goToPatientDashboard() {
    this.router.navigate(['/patient-dashboard']);
  }

}