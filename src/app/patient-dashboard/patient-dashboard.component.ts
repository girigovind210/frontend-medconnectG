import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-patient-dashboard',
  templateUrl: './patient-dashboard.component.html',
  styleUrls: ['./patient-dashboard.component.css']
})
export class PatientDashboardComponent implements OnInit {

  totalStores: number = 0;
  openStores: number = 0;
  stores: any[] = [];
  search: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    console.log("Patient ID:", id);

    this.loadStores();
  }

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
}