import { Byte } from "@angular/compiler/src/util";

export class Process {
    numberProcess: number| any;
    subject: string = '';
    name: string = '';
    email: string = '';
    phone: any = null;
    zipCode: any = '';
    city: string = '';
    district: string = '';
    street: string = '';
    number: any = null;
    additional: string = '';
    processDate: any  = null;
    creationDate: any = null;
    active: boolean = true;
    data: Byte[] = [];
    deleted_by: string ='';
}

export interface Page {
    content: Array<Process>;
    totalPages: number;
    totalElements: number;
    last: boolean;
    size: number;
    number: number;
    sort?: any;
    numberOfElements: number;
    first: boolean;
};
