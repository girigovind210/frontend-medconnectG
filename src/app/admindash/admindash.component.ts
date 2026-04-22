import { Component } from '@angular/core';
import { PatientService } from '../patient.service';
import { Patient } from '../patient';
import { AdminauthService } from '../adminauth.service';
import { Router } from '@angular/router';
import { BASE_URL } from '../constants';  // adjust path as needed

@Component({
  selector: 'app-admindash',
  templateUrl: './admindash.component.html',
  styleUrls: ['./admindash.component.css']
})
export class AdmindashComponent {
searchPatients() {
throw new Error('Method not implemented.');
}
searchText: any;
deletePatient(arg0: number) {
throw new Error('Method not implemented.');
}
  patients:Patient[]=[];
constructor(private patientService:PatientService,private adminauthService:AdminauthService,private router:Router){}
ngOnInit():void{
  this.getPatients();
}
delete(id:number)
{
  this.patientService.delete(id).subscribe(data=>{console.log(data);
    this.getPatients();
  })
}

logout(){
  this.adminauthService.logout();
  this.router.navigate(['home'])
}


loading: boolean = false;

getPatients() {
  this.loading = true;

  this.patientService.getPatientList().subscribe({
    next: (data) => {
      this.patients = data;
      this.loading = false;
    },
    error: (err) => {
      console.error(err);
      this.loading = false;
    }
  });
}
}
