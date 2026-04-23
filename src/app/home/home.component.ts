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

    // ✅ Only trigger when ID exists (fixes button issue)
    if (fullUrl.includes('patient-dashboard/')) {

      const parts = fullUrl.split('patient-dashboard/');
      const id = parts.length > 1 ? parts[1] : null;

      if (id && id.trim() !== '') {
        this.router.navigate(['/patient-dashboard', id]);
      }
    }
  }

  // ✅ Reliable button navigation (works on Render)
  goToPatientDashboard() {
    const id = prompt("Enter Patient ID:");

    if (id && id.trim() !== '') {
      window.location.href = "/#/patient-dashboard/" + id;
    }
  }
}