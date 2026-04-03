import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MedicineService } from '../medicine.service';
import { Medicine } from '../medicine';

@Component({
  selector: 'app-update-medicine',
  templateUrl: './update-medicine.component.html',
  styleUrls: ['./update-medicine.component.css']
})
export class UpdateMedicineComponent {

  medicine: Medicine = new Medicine();
  id: number = 0;

  constructor(
    private route: ActivatedRoute,
    private medicineService: MedicineService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.params['id']);

    this.medicineService.getMedicineById(this.id).subscribe(data => {
      this.medicine = data;
    });
  }

  onSubmit() {
    this.medicineService.updateMedicine(this.id, this.medicine).subscribe({
      next: () => {
        console.log("Updated successfully");
        this.goToMedicine();
      },
      error: (err) => {
        console.error(err);
        alert("Update failed ❌");
      }
    });
  }

  // 🔥 FIX: no patientId needed
  goToMedicine() {
    this.router.navigate(['docdash']); // ✅ safe redirect
  }
}