import { Component, OnInit } from '@angular/core';
import { PatientService } from '../patient.service';
import { Patient } from '../patient';
import { AdminauthService } from '../adminauth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admindash',
  templateUrl: './admindash.component.html',
  styleUrls: ['./admindash.component.css']
})
export class AdmindashComponent implements OnInit {

  patients: Patient[] = [];

  constructor(
    private patientService: PatientService,
    private adminauthService: AdminauthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadPatients();
  }

  loadPatients(): void {
    this.patientService.getPatientList().subscribe({
      next: (data) => {
        console.log("DATA:", data);

        // 🔥 HARD RESET (THIS FIXES RENDER ISSUE)
        this.patients = [];
        setTimeout(() => {
          this.patients = data;
        }, 0);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  delete(id: number): void {
    this.patientService.delete(id).subscribe(() => {
      this.loadPatients();
    });
  }

  logout(): void {
    this.adminauthService.logout();
    this.router.navigate(['home']);
  }
}