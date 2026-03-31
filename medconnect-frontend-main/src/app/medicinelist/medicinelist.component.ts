import { Component } from '@angular/core';
import { Medicine } from '../medicine';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-medicinelist',
  templateUrl: './medicinelist.component.html',
  styleUrls: ['./medicinelist.component.css']
})
export class MedicinelistComponent {

  medicines: Medicine[] = [];
  selectedMedicines: { id: number, name: string, timeToTake: string[] }[] = [];
  patientId!: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    //  FIX: Route param 
    this.patientId = Number(this.route.snapshot.params['id']);
    console.log("Patient ID:", this.patientId);

    if (!this.patientId) {
      alert("Invalid Patient ID");
      return;
    }

    this.getMedicine();
  }

  getMedicine() {
    this.http.get<Medicine[]>(`${environment.apiUrl}/api/v3/medicines`)
      .subscribe(data => {
        this.medicines = data;
      });
  }

  toggleMedicineSelection(medicine: Medicine, event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;

    if (isChecked) {
      const alreadyExists = this.selectedMedicines.some(m => m.id === medicine.id);
      if (!alreadyExists) {
        this.selectedMedicines.push({
          id: medicine.id,
          name: medicine.drugName,
          timeToTake: []
        });
      }
    } else {
      this.selectedMedicines = this.selectedMedicines.filter(m => m.id !== medicine.id);
    }
  }

  updateSelectedTimes(medicine: Medicine, selectedTimes: string[]) {
    const selectedMedicine = this.selectedMedicines.find(m => m.id === medicine.id);
    if (selectedMedicine) {
      selectedMedicine.timeToTake = selectedTimes;
    }
  }

  assignSelectedMedicines() {

    if (this.selectedMedicines.length === 0) {
      alert("Please select at least one medicine.");
      return;
    }

    for (const medicine of this.selectedMedicines) {
      if (!medicine.timeToTake || medicine.timeToTake.length === 0) {
        alert(`Select time for: ${medicine.name}`);
        return;
      }
    }

    const medicinesWithTime = this.selectedMedicines.map(m => ({
      medicineName: m.name,
      timeToTake: m.timeToTake
    }));

    console.log("Patient ID:", this.patientId);
    console.log("Payload:", medicinesWithTime);

    // 🔥 FINAL FIX (correct URL + correct ID)
    this.http.put(
      `${environment.apiUrl}/api/v1/patients/${this.patientId}/add-medicine`,
      medicinesWithTime,
      { responseType: 'text' }
    ).subscribe({
      next: (res) => {
        alert("Medicines assigned successfully ✅");

        this.selectedMedicines = [];

        // 🔥 reload UI
        this.getMedicine();
      },
      error: (err) => {
        console.error(err);
        alert("Assignment failed ❌");
      }
    });
  }

  delete(id: number) {
    this.http.delete(`${environment.apiUrl}/api/v3/medicines/${id}`)
      .subscribe(() => {
        this.getMedicine();
      });
  }

  update(id: number) {
    this.router.navigate(['update-medicine', id]);
  }

  getSelectedMedicine(medicine: Medicine) {
    return this.selectedMedicines.find(m => m.id === medicine.id);
  }
}