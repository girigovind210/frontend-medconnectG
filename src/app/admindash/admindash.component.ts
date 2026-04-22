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
  loading: boolean = false;
  searchText: string = '';

  constructor(
    private patientService: PatientService,
    private adminauthService: AdminauthService,
    private router: Router
  ) {}

  // 🔥 INIT
  ngOnInit(): void {
    this.getPatients();
  }

  // 🔥 GET ALL PATIENTS
  getPatients(): void {
    this.loading = true;

    this.patientService.getPatientList().subscribe({
      next: (data: Patient[]) => {
        console.log("PATIENT DATA:", data);

        this.patients = data || [];   // ✅ clean assignment
        this.loading = false;
      },
      error: (err) => {
        console.error("ERROR:", err);
        this.loading = false;
      }
    });
  }

  // 🔥 DELETE PATIENT
  delete(id: number): void {
    if (!confirm("Are you sure you want to delete this patient?")) {
      return;
    }

    this.patientService.delete(id).subscribe({
      next: () => {
        console.log("Deleted:", id);
        this.getPatients(); // refresh list
      },
      error: (err) => {
        console.error("Delete Error:", err);
      }
    });
  }

  // 🔥 SEARCH (LOCAL FILTER)
  searchPatients(): void {
    if (!this.searchText.trim()) {
      this.getPatients();
      return;
    }

    this.patients = this.patients.filter(p =>
      p.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
      p.id.toString().includes(this.searchText)
    );
  }

  // 🔥 LOGOUT
  logout(): void {
    this.adminauthService.logout();
    this.router.navigate(['home']);
  }
}