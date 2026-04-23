import { Component, OnInit } from '@angular/core';
import { PatientService } from '../patient.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-patient-dashboard',
  templateUrl: './patient-dashboard.component.html',
  styleUrls: ['./patient-dashboard.component.css']
})
export class PatientDashboardComponent implements OnInit {

  patientId: string = '';
  isLoggedIn: boolean = false;

  medicines: any[] = [];
  errorMessage: string = '';

  totalStores: number = 0;
  openStores: number = 0;
  stores: any[] = [];
  search: string = '';

  constructor(
    private patientService: PatientService,
    private route: ActivatedRoute
  ) {}

  // 🔥 AUTO LOGIN FROM WHATSAPP LINK
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    console.log("Route ID:", id);

    if (id) {
      this.patientId = id;
      this.login();   // auto trigger
    }
  }

  // 🔐 LOGIN
  login() {
    if (!this.patientId || this.patientId.trim() === '') {
      this.errorMessage = "Enter Patient ID";
      return;
    }

    this.patientService.getPatientById(Number(this.patientId)).subscribe({

      next: (data: any) => {
        console.log("Patient:", data);

        this.isLoggedIn = true;
        this.errorMessage = '';

        // ✅ handle all possible field names
        this.medicines = data.prescription || data.prescriptions || [];

        this.loadStores();
      },

      error: () => {
        this.isLoggedIn = false;
        this.medicines = [];
        this.stores = [];
        this.totalStores = 0;
        this.openStores = 0;
        this.errorMessage = "Invalid Patient ID";
      }

    });
  }

  // 🏥 LOAD STORES (SMART FILTER)
 loadStores() {

  const prescribed = this.medicines
    .map((m: any) => (m?.medicineName || m?.name || '').toLowerCase())
    .filter(m => m);

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
      medicines: ['Vitamin C', 'Azithromycin']
    }
  ];

  // ✅ SMART MATCH (partial)
  this.stores = allStores.filter(store =>
    store.medicines.some((med: string) =>
      prescribed.some(p => p.includes(med.toLowerCase()))
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

  // 🎯 HIGHLIGHT MATCH
  isMatch(med: string): boolean {
    if (!med) return false;

    return this.medicines.some((p: any) =>
      (p?.medicineName || p?.name || p?.med || '')
        .toLowerCase() === med.toLowerCase()
    );
  }

}