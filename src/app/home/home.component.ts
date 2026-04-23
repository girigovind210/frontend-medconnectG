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

  // 🔥 Fix WhatsApp cached login issue
  if (window.location.href.includes('patient-dashboard')) {
    localStorage.clear();
    sessionStorage.clear();
  }

  const hash = window.location.hash;

  if (hash.includes('patient-dashboard/')) {

    const parts = hash.split('patient-dashboard/');
    const id = parts.length > 1 ? parts[1] : null;

    if (id && id.trim() !== '') {
      this.router.navigate(['/patient-dashboard', id]);
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