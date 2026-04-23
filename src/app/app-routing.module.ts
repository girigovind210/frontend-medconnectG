import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdmindashComponent } from './admindash/admindash.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { CreateAppointmentComponent } from './create-appointment/create-appointment.component';
import { HomeComponent } from './home/home.component';
import { DocdashComponent } from './docdash/docdash.component';
import { CreatePatientComponent } from './create-patient/create-patient.component';
import { MedicinelistComponent } from './medicinelist/medicinelist.component';
import { CreateMedicineComponent } from './create-medicine/create-medicine.component';
import { UpdatePatientComponent } from './update-patient/update-patient.component';
import { ViewPatientComponent } from './view-patient/view-patient.component';
import { UpdateMedicineComponent } from './update-medicine/update-medicine.component';
import { DocloginComponent } from './doclogin/doclogin.component';
import { AdloginComponent } from './adlogin/adlogin.component';
import { AdminauthguardService } from './adminauthguard.service';
import { DoctorauthguardService } from './doctorauthguard.service';
import { PatientDashboardComponent } from './patient-dashboard/patient-dashboard.component';

const routes: Routes = [

  // 🏠 Home (root)
  { path: '', component: HomeComponent },

  // 👤 Patient
  { path: 'patient-dashboard/:id', component: PatientDashboardComponent },

  { path: 'view-medicine/:id', component: MedicinelistComponent },

  // 👨‍⚕️ Doctor
  { path: 'doclogin', component: DocloginComponent },
  { path: 'docdash', component: DocdashComponent, canActivate: [DoctorauthguardService] },
  { path: 'create-patient', component: CreatePatientComponent, canActivate: [DoctorauthguardService] },
  { path: 'update-patient/:id', component: UpdatePatientComponent, canActivate: [DoctorauthguardService] },
  { path: 'view-patient/:id', component: ViewPatientComponent, canActivate: [DoctorauthguardService] },
  { path: 'create-medicine', component: CreateMedicineComponent, canActivate: [DoctorauthguardService] },
  { path: 'update-medicine/:id', component: UpdateMedicineComponent, canActivate: [DoctorauthguardService] },

  // 🛠 Admin
  { path: 'adlogin', component: AdloginComponent },
  { path: 'admin', component: AdmindashComponent, canActivate: [AdminauthguardService] },
  { path: 'appointmentlist', component: AppointmentComponent, canActivate: [AdminauthguardService] },
  { path: 'create-appointment', component: CreateAppointmentComponent, canActivate: [AdminauthguardService] },

  // ❌ fallback
  { path: '**', redirectTo: '' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
