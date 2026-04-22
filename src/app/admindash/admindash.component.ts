import { Component, OnInit } from '@angular/core';
import { PatientService } from '../patient.service';
import { Patient } from '../patient';
import { AdminauthService } from '../adminauth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-admindash',
  templateUrl: './admindash.component.html',
  styleUrls: ['./admindash.component.css'],
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
    next: (data: any[]) => {
      console.log("DATA:", data);

      this.allPatients = data;
      this.patients = data;   // initial display
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
  
  searchText: string = '';
allPatients: Patient[] = [];

searchPatients(): void {
  const value = this.searchText.toLowerCase().trim();

  if (!value) {
    this.patients = this.allPatients;
    return;
  }

  this.patients = this.allPatients.filter(p =>
    p.name.toLowerCase().includes(value) ||
    p.id.toString().includes(value) ||
    p.age.toString().includes(value)
  );
}

}