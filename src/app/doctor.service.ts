import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

// ✅ Optional (recommended)
export interface Doctor {
  id?: number;
  name: string;
  specialization: string;
  email: string;
  phone: string;
}

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  private baseUrl = `${environment.apiUrl}/api/v1/doctors`;

  constructor(private http: HttpClient) {}

  // ✅ GET all doctors
  getDoctors() {
    return this.http.get<Doctor[]>(this.baseUrl);
  }

  // ✅ ADD doctor
  addDoctor(doc: Doctor) {
    return this.http.post(this.baseUrl, doc);
  }

  // ✅ DELETE doctor
  deleteDoctor(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}