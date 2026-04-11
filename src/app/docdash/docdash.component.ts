import { Component } from '@angular/core';
import { PatientService } from '../patient.service';
import { Router } from '@angular/router';
import { DocauthService } from '../docauth.service';
import { Patient } from '../patient';

@Component({
  selector: 'app-docdash',
  templateUrl: './docdash.component.html',
  styleUrls: ['./docdash.component.css']
})
export class DocdashComponent {

  searchQuery: string = '';
  patients: Patient[] = [];
  filteredPatients: Patient[] = [];
  loading: boolean = false;

  constructor(
    private patientService: PatientService,
    private router: Router,
    private docauth: DocauthService
  ) {}

  ngOnInit(): void {
    this.getPatients();
  }

  // 🔹 Get all patients
  getPatients(): void {
    this.loading = true;
    this.patientService.getPatientList().subscribe({
      next: (data) => {
        this.patients = data;
        this.filteredPatients = data;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }

  // 🔹 Search locally
  searchPatient(): void {
    if (this.searchQuery) {
      this.filteredPatients = this.patients.filter(patient =>
        patient.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        patient.id.toString().includes(this.searchQuery)
      );
    } else {
      this.filteredPatients = this.patients;
    }
  }

  // 🔹 Search API (optional)
  searchPatients(): void {
    const query = this.searchQuery.trim();
    if (query) {
      this.patientService.searchPatients(query).subscribe(data => {
        this.filteredPatients = data;
      });
    } else {
      this.filteredPatients = this.patients;
    }
  }

  // 🔹 Update
  update(id: number): void {
    this.router.navigate(['update-patient', id]);
  }

  // 🔹 Delete
  delete(id: number): void {
    this.patientService.delete(id).subscribe(() => {
      this.getPatients();
    });
  }

  // 🔹 View patient
  view(id: number): void {
    this.router.navigate(['view-patient', id]);
  }

  // 🔥 Assign medicine (FINAL FIX)
  assignMedicine(patientId: number): void {
    console.log("Clicked Assign for ID:", patientId);

    this.router.navigate(['view-medicine', patientId]); // ✅ correct
  }

  // 🔹 Logout
  logout(): void {
    this.docauth.logout();
    this.router.navigate(['home']);
  }
}