import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  patientId: string = '';

  constructor(private router: Router) {}

  // ✅ Button click login
  goToPatientDashboard() {
    if (this.patientId && this.patientId.trim() !== '') {
      this.router.navigate(['/patient-dashboard', this.patientId]);
    } else {
      alert('Please enter Patient ID');
    }
  }

  // ✅ Optional: prompt-based login (if you want)
  loginWithPrompt() {
    const id = prompt('Enter Patient ID:');
    if (id) {
      this.router.navigate(['/patient-dashboard', id]);
    }
  }
}