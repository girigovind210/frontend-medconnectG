import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PatientService } from '../patient.service';
import { PrescriptionService } from '../prescription.service';

@Component({
  selector: 'app-view-patient',
  templateUrl: './view-patient.component.html',
  styleUrls: ['./view-patient.component.css']
})
export class ViewPatientComponent implements OnInit {

  id: number = 0;

  patient: any = {
    prescription: []
  };

  patientHistory: any[] = [];

  currentDateTime: string = '';

  constructor(
    private patientService: PatientService,
    private prescriptionService: PrescriptionService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.params['id']);
    this.currentDateTime = new Date().toLocaleString();

    this.loadPatientAndPrescription();
    this.loadHistory();
  }

  loadPatientAndPrescription(): void {
    this.patientService.getPatientById(this.id).subscribe({
      next: (data: any) => {
        this.patient = { ...data, prescription: [] };

        this.prescriptionService.getPrescriptionsByPatientId(this.id).subscribe({
          next: (prescriptions: any[]) => {
            this.patient.prescription = prescriptions || [];
          },
          error: (err: any) => {
            console.error("Prescription Error:", err);
            this.patient.prescription = [];
          }
        });
      },
      error: (err: any) => {
        console.error("Patient Error:", err);
      }
    });
  }

  loadHistory(): void {
  this.prescriptionService.getHistory(this.id).subscribe({
    next: (data) => {
      this.patientHistory = data || [];
    },
    error: (err) => {
      console.error("History error", err);
      this.patientHistory = [];
    }
  });
}
  printPage(): void {
    const printContents = document.getElementById('print-section')?.innerHTML;

    if (!printContents) {
      alert("Nothing to print!");
      return;
    }

    const popupWin = window.open('', '_blank');

    popupWin?.document.open();
    popupWin?.document.write(`
      <html>
        <head>
          <title>Prescription</title>
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
        </head>
        <body onload="window.print(); window.close();">
          ${printContents}
        </body>
      </html>
    `);
    popupWin?.document.close();
  }

  sendPrescription(): void {
    if (!this.patient?.id) {
      alert("Invalid Patient ID!");
      return;
    }

    this.prescriptionService.sendPrescription(this.patient.id).subscribe({
      next: () => alert('Prescription sent successfully!'),
      error: () => alert('Failed to send prescription')
    });
  }
}