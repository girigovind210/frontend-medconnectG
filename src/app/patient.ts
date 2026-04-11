import { Prescription } from "./prescription";

export class Patient {
    id:number=0;
    name:string="";
    age:string="";
    blood:string="";
    prescription: Prescription[] = [];
    dose:string="";
    fees:number=0;
    urgency:string="";
    phoneNumber: string="";

}
