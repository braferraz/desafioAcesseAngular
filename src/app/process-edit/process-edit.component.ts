import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { ProcessService } from '../shared/process.service';
import * as FileSaver from 'file-saver';


@Component({
  templateUrl: './process-edit.component.html',
  styleUrls: ['./process-edit.component.css']
})
export class ProcessEditComponent implements OnInit {

  process:any;
  editProcessData:any;
  editProcess!: FormGroup;
  maxDate = new Date();
  id: any;
  retrieveResponse: any;
  selectedFile: any;
  label: HTMLElement | any;
  
  constructor(private http: HttpClient,
    private processService: ProcessService,
    private aRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.aRoute.snapshot.params['id'];
    this.processService.getProcess(this.id).subscribe((res:any) => this.createForm(res));
    
  }

  createForm(res: any){
    this.editProcess = new FormGroup({
      subject: new FormControl(res.subject, Validators.required),
      applicantsName: new FormControl(res.name, [Validators.required, Validators.maxLength(70), Validators.pattern("^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$")]), 
      applicantsEmail: new FormControl(res.email, [Validators.required, Validators.email]),
      phone: new FormControl(res.phone, [Validators.required, Validators.pattern("[0-9]+$"), Validators.maxLength(11), Validators.minLength(11)]),
      zipCode: new FormControl(res.zipCode, [Validators.required, Validators.pattern("^[0-9]{8}$")]),
      city: new FormControl(res.city),
      district: new FormControl(res.district),
      street: new FormControl(res.street),
      additionalAddress: new FormControl(res.additional, Validators.maxLength(30)),
      number: new FormControl(res.number, [Validators.required, Validators.maxLength(5), Validators.pattern("[0-9]+$")]),
      processDate: new FormControl(res.processDate, Validators.required),
      data: new FormControl(res.data),
    })
    this.process = res;
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

  getPdf() {
    this.processService.getPdfFile(this.process.numberProcess)
      .subscribe(
        res => {
          this.retrieveResponse = res;
          FileSaver.saveAs(this.retrieveResponse, this.process.name + ".pdf" )
        }
      );
  }

  onFileChanged(event:any) {
    this.selectedFile = event.target.files[0];
    if(this.selectedFile.size >= 204800){
      alert("Tamanho não permitido!");
      this.editProcess.get('data')!.setValue(null);
    }
    else{
      this.label = document.getElementById("valuePDF");
      this.label.innerHTML = this.selectedFile.name;
    }
    
  }
  
}
