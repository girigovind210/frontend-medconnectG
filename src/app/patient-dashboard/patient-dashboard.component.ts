import { Component } from '@angular/core';
import { PatientService } from '../patient.service';

@Component({
  selector: 'app-patient-dashboard',
  templateUrl: './patient-dashboard.component.html',
  styleUrls: ['./patient-dashboard.component.css']
})
export class PatientDashboardComponent {

  patientId: string = '';
  isLoggedIn: boolean = false;

  medicines: any[] = [];
  errorMessage: string = '';

  totalStores: number = 0;
  openStores: number = 0;
  stores: any[] = [];
  search: string = '';

  constructor(private patientService: PatientService) {}

  // 🔐 LOGIN
  login() {
    if (!this.patientId.trim()) {
      this.errorMessage = "Enter Patient ID";
      return;
    }

    this.patientService.getPatientById(Number(this.patientId)).subscribe({

      next: (data: any) => {
        console.log("Patient:", data);

        this.isLoggedIn = true;
        this.errorMessage = '';

        // 🔥 IMPORTANT (check your backend field name)
        this.medicines = data.prescription || data.prescriptions || [];

        this.loadStores();
      },

      error: () => {
        this.isLoggedIn = false;
        this.medicines = [];
        this.errorMessage = "Invalid Patient ID";
      }

    });
  }

  // 🏥 LOAD STORES (dummy for now)
 loadStores() {

  // ✅ safe mapping (avoid undefined)
  const prescribed = this.medicines
    .map((m: any) => (m?.medicineName || m?.name || '').toLowerCase())
    .filter(m => m); // remove empty

  const allStores = [
    {
      name: 'City Medical',
      open: true,
      distance: 0.8,
      medicines: ['Paracetamol', 'Crocin', 'Azithromycin']
    },
    {
      name: 'HealthPlus Pharmacy',
      open: false,
      distance: 1.5,
      medicines: ['Dolo', 'Ibuprofen']
    },
    {
      name: 'Care Medical',
      open: true,
      distance: 2.2,
      medicines: ['Vitamin C']
    }
  ];

  // ✅ safe filter
  this.stores = allStores.filter(store =>
    store.medicines.some((med: any) =>
      med && prescribed.includes(med.toLowerCase())
    )
  );

  this.totalStores = this.stores.length;
  this.openStores = this.stores.filter(s => s.open).length;
}

  // 🔍 SEARCH
  searchMedicine() {
    if (!this.search) {
      this.loadStores();
      return;
    }

    this.stores = this.stores.filter(store =>
      store.medicines.some((m: string) =>
        m.toLowerCase().includes(this.search.toLowerCase())
      )
    );
  }
 isMatch(med: string): boolean {
  if (!med) return false;

  return this.medicines.some((p: any) =>
    (p?.medicineName || p?.name || '').toLowerCase() === med.toLowerCase()
  );
}
}