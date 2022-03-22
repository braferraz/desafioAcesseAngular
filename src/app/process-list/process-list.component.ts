import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as FileSaver from 'file-saver';
import { Page, Process } from '../shared/process';
import { ProcessService } from '../shared/process.service';

@Component({
  templateUrl: './process-list.component.html',
  styleUrls: ['./process-list.component.css']
})
export class ProcessListComponent implements OnInit {
  processo: Array<Process> = new Array();
  retrieveResponse: any;
  public page:Page | any;
  totalPages:any;
  p: number = 0;
  count: Number = 5;

  @Output() public  paginationEvent : EventEmitter<any> = new EventEmitter();

  constructor(private processService: ProcessService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.pageProducts();
  }

  pageProducts(){
    this.processService.getAllProcess().subscribe(res=> {
      this.page = res;
      this.processo = this.page.content;
    });
  }
  onDelete(id: any, process:any){
    let text = "Você realmente deseja excluir o processo: " + id + " ?";
    process.deletedBy = localStorage.getItem("name");
    if (confirm(text) == true) {
      this.processService.deleteProcess(id, process).subscribe(res => 
      alert("Processo removido!"));
      location.reload()
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
