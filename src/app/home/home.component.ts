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

      const parts = fullUrl.split('patient-dashboard/');
const id = parts.length > 1 ? parts[1] : null;

      if (id) {
        this.router.navigate(['/patient-dashboard', id]);
      }
    }
  }

  
  goToPatientDashboard() {
  window.location.href = "/#/patient-dashboard";
}
}