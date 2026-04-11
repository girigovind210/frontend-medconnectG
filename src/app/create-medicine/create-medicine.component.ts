import { Component } from '@angular/core';
import { Medicine } from '../medicine';
import { MedicineService } from '../medicine.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-medicine',
  templateUrl: './create-medicine.component.html',
  styleUrls: ['./create-medicine.component.css']
})
export class CreateMedicineComponent {

  medicine: Medicine = new Medicine();

  constructor(
    private medicineService: MedicineService,
    private router: Router
  ) {}

  saveMedicine() {
    this.medicineService.createMedicine(this.medicine).subscribe({
      next: () => {
        console.log(this.medicine);
        alert("Medicine added successfully ✅");

        this.goToDashboard();
      },
      error: (err) => {
        console.error(err);
        alert("Failed to add medicine ❌");
      }
    });
  }

  onSubmit() {
    this.saveMedicine();
  }

  goToDashboard() {
    this.router.navigate(['docdash']);
  }

  // 🔥 ADD THIS (for Back button)
  goBack() {
    this.router.navigate(['docdash']);
  }
}