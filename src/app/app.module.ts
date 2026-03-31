import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdmindashComponent } from './admindash/admindash.component';
import { HttpClientModule } from '@angular/common/http';
import { AppointmentComponent } from './appointment/appointment.component';
import { CreateAppointmentComponent } from './create-appointment/create-appointment.component';
import { FormsModule } from '@angular/forms';
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
import { PatientDashboardComponent } from './patient-dashboard/patient-dashboard.component';
import { AssistantLoginComponent } from '../../medconnect-frontend-main/src/app/assistant-login/assistant-login.component';



@NgModule({
  declarations: [
  AppComponent,
  HomeComponent,
  PatientDashboardComponent,
  AdloginComponent,
  DocloginComponent,
  CreatePatientComponent,
  UpdatePatientComponent,
  CreateMedicineComponent,
  UpdateMedicineComponent,
  MedicinelistComponent,
  CreateAppointmentComponent,
  DocdashComponent,
  AssistantLoginComponent,
],

  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
