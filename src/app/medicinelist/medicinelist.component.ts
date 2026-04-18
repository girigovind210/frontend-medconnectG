import { Component, OnInit } from '@angular/core';
import { Medicine } from '../medicine';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-medicinelist',
  templateUrl: './medicinelist.component.html',
  styleUrls: ['./medicinelist.component.css']
})
export class MedicinelistComponent implements OnInit {

  medicines: Medicine[] = [];

  selectedMedicines: {
    id: number,
    name: string,
    timeToTake: string[]
  }[] = [];

  assignedMedicines: any[] = [];

  patientId!: number;
  loading: boolean = false;

  // 🔥 NEW
  symptoms: string = '';
  diagnosis: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  // ✅ SINGLE ngOnInit (FIXED)
  ngOnInit(): void {

    this.patientId = Number(this.route.snapshot.params['id']);

    console.log("Patient ID:", this.patientId);

    if (!this.patientId || isNaN(this.patientId)) {
      alert("Invalid Patient ID ❌");
      return;
    }

    this.getMedicine();
    this.loadAssignedMedicines();

    // 🔥 AUTO-FILL LAST VISIT
    this.loadLastData();
  }

  // 🔥 get all medicines
  getMedicine() {
    this.loading = true;

    this.http.get<Medicine[]>(`${environment.apiUrl}/api/v3/medicines`)
      .subscribe({
        next: (data) => {
          this.medicines = data;
          this.loading = false;
        },
        error: (err) => {
          console.error(err);
          this.loading = false;
        }
      });
  }

  // 🔥 load assigned medicines
  loadAssignedMedicines() {
    this.http.get<any>(`${environment.apiUrl}/api/v1/patients/${this.patientId}`)
      .subscribe({
        next: (data) => {
          console.log("Updated Patient:", data);
          this.assignedMedicines = data?.prescription || [];
        },
        error: (err) => {
          console.error("Error loading assigned medicines:", err);
        }
      });
  }

  // 🔥 AUTO-FILL LAST DATA
  loadLastData() {
    this.http.get<any>(
      `${environment.apiUrl}/api/v1/prescriptions/last/${this.patientId}`
    ).subscribe({
      next: (data) => {
        if (data) {
          this.symptoms = data.symptoms || '';
          this.diagnosis = data.diagnosis || '';
        }
      },
      error: (err) => console.error(err)
    });
  }

  // 🔥 select checkbox
  toggleMedicineSelection(medicine: Medicine, event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;

    if (isChecked) {
      const exists = this.selectedMedicines.some(m => m.id === medicine.id);

      if (!exists) {
        this.selectedMedicines.push({
          id: medicine.id,
          name: medicine.drugName,
          timeToTake: []
        });
      }
    } else {
      this.selectedMedicines =
        this.selectedMedicines.filter(m => m.id !== medicine.id);
    }
  }

  // 🔥 update times
  updateSelectedTimes(medicine: Medicine, selectedTimes: string[]) {
    const selected = this.selectedMedicines.find(m => m.id === medicine.id);

    if (selected) {
      selected.timeToTake = selectedTimes;
    }
  }

  // 🔥 assign medicines
  assignSelectedMedicines() {

    if (this.selectedMedicines.length === 0) {
      alert("Please select at least one medicine.");
      return;
    }

    for (const m of this.selectedMedicines) {
      if (!m.timeToTake || m.timeToTake.length === 0) {
        alert(`Select time for: ${m.name}`);
        return;
      }
    }

    const payload = this.selectedMedicines.map(m => ({
      medicineName: m.name,
      timeToTake: m.timeToTake,
      symptoms: this.symptoms,     // 🔥 FIX
      diagnosis: this.diagnosis    // 🔥 FIX
    }));

    console.log("Payload:", payload);

    this.http.put(
      `${environment.apiUrl}/api/v1/patients/${this.patientId}/add-medicine`,
      payload,
      { responseType: 'text' }
    ).subscribe({
      next: () => {
        alert("Medicines assigned successfully ✅");

        this.selectedMedicines = [];

        // 🔥 RESET
        this.symptoms = '';
        this.diagnosis = '';

        this.loadAssignedMedicines();
      },
      error: (err) => {
        console.error(err);
        alert("Assignment failed ❌");
      }
    });
  }

  // 🔥 delete medicine
  delete(id: number) {
    this.http.delete(`${environment.apiUrl}/api/v3/medicines/${id}`)
      .subscribe({
        next: () => {
          this.getMedicine();
        },
        error: (err) => {
          console.error(err);
        }
      });
  }

  // 🔥 navigate update
  update(id: number) {
    this.router.navigate(['update-medicine', id]);
  }

  // 🔥 helper
  getSelectedMedicine(medicine: Medicine) {
    return this.selectedMedicines.find(m => m.id === medicine.id);
  }
}