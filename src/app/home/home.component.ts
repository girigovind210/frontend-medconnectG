import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  patientId: string = '';   // ✅ ADD THIS

  constructor(private router: Router) {}

  goToPatientDashboard() {
    if (!this.patientId || this.patientId.trim() === '') {
      alert('Please enter Patient ID');
      return;
    }

    this.router.navigate(['/patient-dashboard', this.patientId]);
  }
}