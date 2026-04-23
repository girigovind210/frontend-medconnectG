import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  patientId: string = '';   // ✅ ADD THIS

  constructor(private router: Router) {}

  goToPatientDashboard() {
  const id = prompt('Enter Patient ID');

  if (!id || id.trim() === '') {
    alert('Please enter Patient ID');
    return;
  }

  this.router.navigate(['/patient-dashboard', id]);
}
}