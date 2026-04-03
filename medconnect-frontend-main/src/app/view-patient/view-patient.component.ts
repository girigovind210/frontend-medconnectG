import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PatientService } from '../patient.service';
import { PrescriptionService } from '../prescription.service';
import { Patient } from '../patient';

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
    // 1. URL madhun Patient ID ghyava
    this.id = Number(this.route.snapshot.params['id']);
    
    // 2. Patient Data Load kara
    this.loadPatientData();

    // 3. Current Date set kara
    this.currentDateTime = new Date().toLocaleString();
  }

  /**
   * API kadun patient chi mahiti ani prescription ghenyasathi
   */
  loadPatientData(): void {
    this.patientService.getPatientById(this.id).subscribe({
      next: (data: any) => {
        console.log("🔥 API Response Received:", data);

        // Patient object assign kara
        this.patient = { ...data };

        // Prescription array check ani fix kara (जर data null asel tar empty array dya)
        if (data.prescription && Array.isArray(data.prescription)) {
          this.patient.prescription = data.prescription;
        } else {
          this.patient.prescription = [];
        }

        console.log("✅ Prescription Loaded:", this.patient.prescription);
      },
      error: (err) => {
        console.error("❌ Error loading patient data:", err);
        alert("Patient data load karta yet nahiye!");
      }
    });
  }

  /**
   * Prescription Print karnyachi logic
   */
  printPage(): void {
    const printContents = document.getElementById('print-section')?.innerHTML;
    
    if (!printContents) {
      alert("Print karnyasathi content sapdla nahi!");
      return;
    }

    const popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    
    popupWin?.document.open();
    popupWin?.document.write(`
      <html>
        <head>
          <title>Medical Prescription - MedConnect</title>
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
          <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 30px; }
            .table-bordered th, .table-bordered td { border: 1px solid #dee2e6 !important; }
            @media print { .no-print { display: none; } }
          </style>
        </head>
        <body onload="window.print(); window.close();">
          ${printContents}
        </body>
      </html>
    `);
    popupWin?.document.close();
  }

  /**
   * Patient la prescription pathvnya sathi
   */
  sendPrescription(): void {
    if (!this.patient?.id) {
      alert("Invalid Patient ID! ❌");
      return;
    }

    this.prescriptionService.sendPrescription(this.patient.id).subscribe({
      next: (res) => {
        alert('Prescription successfully sent to patient! ✅');
      },
      error: (error) => {
        console.error("Error sending prescription:", error);
        alert('Failed to send prescription. Please try again. ❌');
      }
    });
  }
}