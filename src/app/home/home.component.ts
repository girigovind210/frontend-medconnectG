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

    const hash = window.location.hash; // e.g. #/patient-dashboard/45

    // 👉 If link contains patient-dashboard with ID
    if (hash.includes('patient-dashboard/')) {

      const parts = hash.split('patient-dashboard/');
      const id = parts.length > 1 ? parts[1] : null;

      if (id && id.trim() !== '') {
        // try to go to dashboard
        this.router.navigate(['/patient-dashboard', id]).catch(() => {
          // ❌ fallback to home
          this.router.navigate(['/']);
        });
      }
    }
  }

  // 👇 Button always works
  goToPatientDashboard() {
    const id = prompt("Enter Patient ID:");
    if (id && id.trim() !== '') {
      this.router.navigate(['/patient-dashboard', id]);
    }
  }
}