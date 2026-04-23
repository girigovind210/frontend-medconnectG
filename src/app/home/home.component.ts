import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit(): void {

    const fullUrl = window.location.href;

    // 🔥 handle whatsapp redirect
    if (fullUrl.includes('patient-dashboard')) {

      const id = fullUrl.split('patient-dashboard/')[1];

      if (id) {
        this.router.navigate(['/patient-dashboard', id]);
      }
    }
  }

  // ✅ ADD THIS FUNCTION (missing earlier)
  goToPatientDashboard() {
    this.router.navigate(['/patient-dashboard']);
  }
}