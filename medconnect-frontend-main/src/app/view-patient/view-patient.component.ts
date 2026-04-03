import { Component, OnInit } from '@angular/core';
import { PatientService } from '../patient.service';
import { ActivatedRoute } from '@angular/router';
import { Patient } from '../patient';
import { PrescriptionService } from '../prescription.service';

@Component({
  selector: 'app-view-patient',
  templateUrl: './view-patient.component.html',
  styleUrls: ['./view-patient.component.css']
})
export class ViewPatientComponent implements OnInit {

  id: number = 0;
  patient: Patient = new Patient();
  currentDateTime: string = '';

  constructor(
    private patientService: PatientService,
    private prescriptionService: PrescriptionService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {

    // ✅ GET ID
    this.id = Number(this.route.snapshot.params['id']);

    // ✅ API CALL
    this.patientService.getPatientById(this.id).subscribe({
      next: (data) => {

        console.log("🔥 FULL API RESPONSE:", data);

        // 🔥 IMPORTANT FIX (change detection safe copy)
        this.patient = { ...data };

        // ✅ SAFE FALLBACK
        this.patient.prescription = this.patient.prescription || [];

        console.log("🔥 PRESCRIPTION:", this.patient.prescription);

        // 🔍 DEBUG
        if (this.patient.prescription.length > 0) {
          console.log("🔥 FIRST PRESCRIPTION:", this.patient.prescription[0]);
          console.log("🔥 MEDICINE OBJECT:", this.patient.prescription[0]?.medicine);
        }

        // ✅ DATE TIME
        this.currentDateTime = new Date().toLocaleString();
      },

      error: (err) => {
        console.error("❌ Error loading patient:", err);
      }
    });
  }

  // 🖨️ PRINT
  printPage(): void {

    const printContents = document.getElementById('print-section')?.innerHTML;

    if (!printContents) return;

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

  // 📤 SEND PRESCRIPTION
  sendPrescription(): void {

    if (!this.patient?.id) {
      alert("Invalid patient ❌");
      return;
    }

    this.prescriptionService.sendPrescription(this.patient.id).subscribe({
      next: () => {
        alert('Prescription sent successfully ✅');
      },
      error: (error) => {
        console.error(error);
        alert('Failed to send ❌');
      }
    });
  }

}