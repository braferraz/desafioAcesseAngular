import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Process } from './shared/process';
@Component({
  templateUrl: './process-form.component.html',
  styleUrls: ['./process-form.component.css']
})
export class ProcessFormComponent implements OnInit {
  formProcess!: FormGroup;
  maxDate = new Date();
  constructor() { }

  ngOnInit(): void {
    this.createForm(new Process())
  }
  createForm(process: Process) {
    this.formProcess = new FormGroup({
      subject: new FormControl(process.subject),
      applicantsName: new FormControl(process.applicantsName),
      applicantsEmail: new FormControl(process.applicantsEmail),
      phone: new FormControl(process.phone),
      zipCode: new FormControl(process.zipCode),
      city: new FormControl(process.city),
      district: new FormControl(process.district),
      street: new FormControl(process.street),
      additionalAddress: new FormControl(process.additionalAddress),
      number: new FormControl(process.number),
      processDate: new FormControl(process.processDate),
      creationDate: new FormControl(process.street),
      active: new FormControl(process.number),
      data: new FormControl(process.processDate),
    })
  }
}
