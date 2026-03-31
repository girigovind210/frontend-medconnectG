import { Component } from '@angular/core';
import { PatientService } from '../patient.service';
import { ActivatedRoute } from '@angular/router';
import { Patient } from '../patient';
import { PrescriptionService } from '../prescription.service';
import { environment } from '../../environments/environment';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-view-patient',
  templateUrl: './view-patient.component.html',
  styleUrls: ['./view-patient.component.css']
})
@Component({
  selector: 'app-view-patient',
  templateUrl: './view-patient.component.html',
  styleUrls: ['./view-patient.component.css']
})
export class ViewPatientComponent {

  id: number = 0;
  patient: Patient = new Patient();
  currentDateTime: string = '';

  constructor(
    private patientService: PatientService,
    private prescriptionService: PrescriptionService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {

    // 🔹 Get patient ID from route
    this.id = Number(this.route.snapshot.params['id']);

    if (!this.id) {
      alert("Invalid Patient ID ❌");
      return;
    }

    // 🔹 Load patient details
    this.patientService.getPatientById(this.id).subscribe({
      next: (data) => {
        this.patient = data;

        // safe fallback
        this.patient.prescription = data.prescription || [];

        console.log("Patient:", this.patient);
      },
      error: (err) => {
        console.error(err);
      }
    });

    // 🔹 Load prescriptions separately (IMPORTANT)
    this.prescriptionService.getPrescriptionsByPatientId(this.id)
      .subscribe({
        next: (data) => {
          console.log("Prescriptions:", data);
          this.patient.prescription = data;
        },
        error: (err) => {
          console.error(err);
        }
      });

    // 🔹 Date time
    const now = new Date();
    this.currentDateTime = now.toLocaleString();
  }

  // 🔥 UPDATE FEES (Doctor)
 updateFees() {

  const fees = Number(this.patient.fees); // 🔥 FIX

  if (!fees || fees < 0) {
    alert("Enter valid fees ❌");
    return;
  }

  this.patient.fees = fees; // optional but safe

  this.patientService.updateFees(this.patient.id, this.patient)
    .subscribe({
      next: () => {
        alert("Fees updated successfully 💰");
      },
      error: (err) => {
        console.error(err);
        alert("Failed to update fees ❌");
      }
    });
}

  // 🔹 Print
  printPage(): void {
    const printContents = document.getElementById('print-section')?.innerHTML;
    const popupWin = window.open('', '_blank', 'width=800,height=600');

    popupWin?.document.open();
    popupWin?.document.write(`
      <html>
        <head>
          <title>Print Prescription</title>
          <style>
            body { font-family: Arial; padding: 20px; }
            table { border-collapse: collapse; width: 100%; }
            th, td { border: 1px solid #ccc; padding: 8px; }
          </style>
        </head>
        <body onload="window.print();window.close()">
          ${printContents}
        </body>
      </html>
    `);
    popupWin?.document.close();
  }

  // 🔹 Send Prescription
  sendPrescription(): void {
    this.prescriptionService.sendPrescription(this.patient.id).subscribe({
      next: () => {
        alert('Prescription sent on WhatsApp ✅');
      },
      error: (err) => {
        console.error(err);
        alert('Failed to send ❌');
      }
    });
  }
}