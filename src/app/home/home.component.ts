import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private router: Router) {}

  goToPatientDashboard() {
    const id = prompt("Enter Patient ID:");

    if (id && id.trim() !== '') {
      this.router.navigate(['/patient-dashboard', id]);
    }
  }
}