import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { of } from 'rxjs';
import { Process } from './shared/process';
import { HttpClient } from '@angular/common/http';
@Component({
  templateUrl: './process-form.component.html',
  styleUrls: ['./process-form.component.css']
})
export class ProcessFormComponent implements OnInit {
  formProcess!: FormGroup;
  maxDate = new Date();

  constructor(private http: HttpClient,) { }

  ngOnInit(): void {
    this.createForm(new Process())
  }

  createForm(process: Process) {
    this.formProcess = new FormGroup({
      subject: new FormControl(process.subject, Validators.required),
      applicantsName: new FormControl(process.applicantsName, [Validators.required, Validators.maxLength(70), Validators.pattern("[a-zA-Z\s\b]+$")]), 
      applicantsEmail: new FormControl(process.applicantsEmail, [Validators.required, Validators.email]),
      phone: new FormControl(process.phone, [Validators.required, Validators.pattern("[0-9]+$"), Validators.maxLength(11), Validators.minLength(11)]),
      zipCode: new FormControl(process.zipCode, [Validators.required, Validators.pattern("^[0-9]{8}$")]),
      city: new FormControl(process.city),
      district: new FormControl(process.district),
      street: new FormControl(process.street),
      additionalAddress: new FormControl(process.additionalAddress, Validators.maxLength(30)),
      number: new FormControl(process.number, [Validators.required, Validators.maxLength(5), Validators.pattern("[0-9]+$")]),
      processDate: new FormControl(process.processDate, Validators.required),
      active: new FormControl(process.active),
      data: new FormControl(process.data),
    })
  }

  findCep(cep: string, form: any){
    cep = cep.replace(/\D/g, '');
    if (cep !== '') {
      const validateCep = /^[0-9]{8}$/;
      if (validateCep.test(cep)) {
        return this.http.get(`http://viacep.com.br/ws/${cep}/json`).subscribe(data => this.insertAdressForm(data, form));
      }
    }
    return of({});
  }
  
  insertAdressForm(dados:any, formulario:any) {
    formulario.form.patchValue({
      city: dados.localidade,
      district: dados.bairro,
      street: dados.logradouro,
    });
  }
}
