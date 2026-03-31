import { Component } from '@angular/core';
import { Patient } from '../patient';
import { PatientService } from '../patient.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-patient',
  templateUrl: './create-patient.component.html',
  styleUrls: ['./create-patient.component.css']
})
export class CreatePatientComponent {

  patient: Patient = new Patient();

  constructor(
    private patientService: PatientService,
    private router: Router
  ) {}

  savepatient() {
    this.patientService.createPatient(this.patient).subscribe((data: any) => {

      console.log("Created Patient:", data);

      const patientId = data.id;

      // 🔥 navigate with ID
      this.router.navigate(['/docdash']); 

    });
  }

  // 🔥 THIS WAS MISSING
  onSubmit() {
    this.savepatient();
  }
}