import { Byte } from "@angular/compiler/src/util";

export class Process {
    subject: string = '';
    applicantsName: string = '';
    applicantsEmail: string = '';
    phone: any = null;
    zipCode: any = '';
    city: string = '';
    district: string = '';
    street: string = '';
    number: any = null;
    additionalAddress: string = '';
    processDate: any  = null;
    creationDate: any = null;
    active: boolean = true;
    data: Byte[] = [];
}