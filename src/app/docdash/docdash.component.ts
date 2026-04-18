import { Component, OnInit } from '@angular/core';
import { PatientService } from '../patient.service';
import { Router } from '@angular/router';
import { DocauthService } from '../docauth.service';
import { Patient } from '../patient';

@Component({
  selector: 'app-docdash',
  templateUrl: './docdash.component.html',
  styleUrls: ['./docdash.component.css']
})
export class DocdashComponent implements OnInit {

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

  // 🔹 Load all patients
  getPatients(): void {
    this.loading = true;
    this.patientService.getPatientList().subscribe({
      next: (data: Patient[]) => {
        this.patients = data;
        this.filteredPatients = data;
        this.loading = false;
      },
      error: (err: any) => {
        console.error(err);
        this.loading = false;
      }
    });
  }

  // 🔍 SEARCH (API BASED)
  searchPatients(): void {
    const query = this.searchQuery.trim();

    if (query) {
      this.patientService.searchPatients(query).subscribe({
        next: (data: Patient[]) => {
          this.filteredPatients = data;
        },
        error: (err: any) => {
          console.error("Search error", err);
        }
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

  // 🔹 View
  view(id: number): void {
    this.router.navigate(['view-patient', id]);
  }

  // 🔹 Assign Medicine
  assignMedicine(patientId: number): void {
    this.router.navigate(['view-medicine', patientId]);
  }

  // 🔹 Logout
  logout(): void {
    this.docauth.logout();
    this.router.navigate(['home']);
  }
}