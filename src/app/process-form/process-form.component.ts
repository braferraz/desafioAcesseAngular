import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { of } from 'rxjs';
import { Process } from '../shared/process';
import { HttpClient } from '@angular/common/http';
import { ProcessService } from '../shared/process.service';
import * as FileSaver from 'file-saver';
import { Route, Router } from '@angular/router';
@Component({
  templateUrl: './process-form.component.html',
  styleUrls: ['./process-form.component.css']
})
export class ProcessFormComponent implements OnInit {
  formProcess!: FormGroup;
  label: any;
  upload: any;
  maxDate = new Date(); 
  submitted: boolean = false;
  selectedFile!: File;

  constructor(private http: HttpClient,
    private processService: ProcessService,
    private router: Router) { }

  ngOnInit(): void {
    this.createForm(new Process())
  }

  createForm(process: Process) {
    this.formProcess = new FormGroup({
      subject: new FormControl(process.subject, Validators.required),
      name: new FormControl(process.name, [Validators.required, Validators.maxLength(70), Validators.pattern("^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$")]), 
      email: new FormControl(process.email, [Validators.required, Validators.email]),
      phone: new FormControl(process.phone, [Validators.required, Validators.pattern("[0-9]+$"), Validators.maxLength(11), Validators.minLength(11)]),
      zipCode: new FormControl(process.zipCode, [Validators.required, Validators.pattern("^[0-9]{8}$")]),
      city: new FormControl(process.city),
      district: new FormControl(process.district),
      street: new FormControl(process.street),
      additional: new FormControl(process.additional, Validators.maxLength(30)),
      number: new FormControl(process.number, [Validators.required, Validators.maxLength(5), Validators.pattern("[0-9]+$")]),
      processDate: new FormControl(process.processDate, Validators.required),
      creationDate: new FormControl(null), //[ngModel]="data | date: 'dd/MM/yyyy hh:mm'" pipe para datas, deve ser convertido no java para data no banco e vice versa
      data: new FormControl(null, [Validators.required]),
      active: new FormControl(true),
    })
  }

  onSubmit(formProcess:any){
    this.submitted = true;
    const uploadData = new FormData();
    console.log(uploadData);
    uploadData.append('pdfFile', this.selectedFile, this.selectedFile.name);

    this.processService.insertFile(uploadData).subscribe(res =>console.log(res));

    this.processService.insertProcess(formProcess.value)
      .subscribe((result)=>{
      console.warn("result " + result)
    });
    this.router.navigate(["/processos"]);
  }

  onFileChanged(event:any) {
    this.selectedFile = event.target.files[0];
    if(this.selectedFile.size >= 204800){
      alert("Tamanho não permitido!");
      this.formProcess.get('data')!.setValue(null);
    }
    else{
      this.label = document.getElementById("valuePDF")
      this.label.innerHTML = this.selectedFile.name;
    }
    
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
