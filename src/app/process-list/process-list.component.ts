import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as FileSaver from 'file-saver';
import { Process } from '../shared/process';
import { ProcessService } from '../shared/process.service';

@Component({
  templateUrl: './process-list.component.html',
  styleUrls: ['./process-list.component.css']
})
export class ProcessListComponent implements OnInit {
  processo: Array<Process> = new Array();
  page: any; 
  retrieveResponse: any;
  constructor(private processService: ProcessService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.processService.getAllProcess().subscribe(process => {
      this.page = process;
      console.log(this.page.content);
      this.processo = this.page.content;
    })
  }

  onDelete(id: any, process:any){
    console.log(id, process);
    let text = "Você realmente deseja excluir o processo: " + id + " ?";
    if (confirm(text) == true) {
      this.processService.deleteProcess(id, process).subscribe(res => console.log(res));
      alert("Processo removido!");
      location.reload();
    } 
  }

  getPdf(id:any, name: any) {
    this.processService.getPdfFile(id)
      .subscribe(
        res => {
          this.retrieveResponse = res;
          FileSaver.saveAs(this.retrieveResponse, name + ".pdf" )
        }
      );
  }
}
