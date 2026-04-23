import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-patient-dashboard',
  templateUrl: './patient-dashboard.component.html',
  styleUrls: ['./patient-dashboard.component.css']
})
export class PatientDashboardComponent {

  patientId: string = '';
  isLoggedIn: boolean = false;

  totalStores: number = 0;
  openStores: number = 0;
  stores: any[] = [];
  search: string = '';

  // 🔐 LOGIN
  login() {
    if (!this.patientId.trim()) {
      alert("Enter Patient ID");
      return;
    }

    this.isLoggedIn = true;

    console.log("Patient ID:", this.patientId);

    this.loadStores(); // load after login
  }

  // 🏥 LOAD STORES
  loadStores() {
    this.totalStores = 3;
    this.openStores = 2;

    this.stores = [
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
        medicines: ['Paracetamol', 'Vitamin C']
      }
    ];
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

  constructor(private route: ActivatedRoute) {}

ngOnInit(): void {
  const id = this.route.snapshot.queryParamMap.get('id');

  if (id) {
    this.patientId = id;
    this.login(); // auto login
  }
}
}