import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Patient } from './patient';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  private baseUrl = `${environment.apiUrl}/api/v1/patients`;

  constructor(private httpclient: HttpClient) { }

  // 🔹 Get all patients
  getPatientList(): Observable<Patient[]> {
    return this.httpclient.get<Patient[]>(`${this.baseUrl}`);
  }

  // 🔹 Delete patient
  delete(id: number): Observable<object> {
    return this.httpclient.delete(`${this.baseUrl}/${id}`);
  }

  // 🔹 Create patient (Assistant use)
  createPatient(patient: any) {
  return this.httpclient.post(
    `${environment.apiUrl}/api/v1/patients`,
      // 🔥 IMPORTANT
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );
}

  // 🔹 Get patient by ID
  getPatientById(id: number): Observable<Patient> {
    return this.httpclient.get<Patient>(`${this.baseUrl}/${id}`);
  }

  // 🔹 Update patient (general)
  updatePatient(id: number, patient: Patient): Observable<object> {
    return this.httpclient.put(`${this.baseUrl}/${id}`, patient);
  }

  // 🔥 🔥 IMPORTANT (Doctor adds fees)
  updateFees(id: number, patient: any): Observable<any> {
    return this.httpclient.put(
      `${this.baseUrl}/${id}/fees`,
      patient
    );
  }

  // 🔹 Send prescription (WhatsApp)
  sendPrescription(id: number, request: { phoneNumber: string, message: string }): Observable<any> {
    return this.httpclient.put(`${this.baseUrl}/${id}/send-prescription`, request);
  }

  // 🔹 Search patients
  searchPatients(query: string): Observable<Patient[]> {
    return this.httpclient.get<Patient[]>(`${this.baseUrl}/search?query=${query}`);
  }
}