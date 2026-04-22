import { Component, OnInit } from '@angular/core';
import { PatientService } from '../patient.service';
import { Patient } from '../patient';
import { AdminauthService } from '../adminauth.service';
import { Router } from '@angular/router';
import { DoctorService } from '../doctor.service';


@Component({
  selector: 'app-admindash',
  templateUrl: './admindash.component.html',
  styleUrls: ['./admindash.component.css'],
})
export class AdmindashComponent implements OnInit {

  patients: Patient[] = [];

  constructor(
    private patientService: PatientService,
    private doctorService: DoctorService,
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

viewMode: 'patients' | 'doctors' = 'patients';
doctors: any[] = [];
newDoctor = {
  name: '',
  specialization: '',
  email: '',
  phone: ''
};

loadDoctors() {
  this.doctorService.getDoctors().subscribe(data => {
    this.doctors = data;
  });
}

switchToDoctors() {
  this.viewMode = 'doctors';
  this.loadDoctors();
}

switchToPatients() {
  this.viewMode = 'patients';
}

addDoctor() {
  this.doctorService.addDoctor(this.newDoctor).subscribe(() => {
    alert("Doctor added ✅");
    this.newDoctor = { name: '', specialization: '', email: '', phone: '' };
    this.loadDoctors();
  });
}
deleteDoctor(id: number) {
  this.doctorService.deleteDoctor(id).subscribe(() => {
    this.loadDoctors();
  });
}
}