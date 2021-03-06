import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProcessService {
  
  constructor(private http: HttpClient) { }

  idToken = localStorage.getItem("token");
  headers = {headers: new HttpHeaders({
    'Content-Type': 'application/json',
    "Authorization": `Bearer ${this.idToken}`
  })};

  public insertProcess(process:any){
    return this.http.post('/api/process/new',process,  {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.idToken}`,
      }),
    }
  )}
  public insertFile(pdf:any){
    return this.http.post('api/upload', pdf,  {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.idToken}`
      }),
    }
  )}
  public getProcess(id:any){
    return this.http.get('/api/process/edit/' + `${id}`, this.headers);
  }
  public getAllProcess(){
    return this.http.get('/api/process/all', this.headers);
  }
  public getPageProcess(page:any, size:any){
    return this.http.get(`/api/process/all?page=${page}&size=${size}`, this.headers);
  }
  public deleteProcess(id:any, process:any){
    return this.http.put('/api/process/delete/' + `${id}`, process, this.headers);
  }
  public getPdfFile(id:any){
    return this.http.get<any>('/api/get/' + `${id}`,  {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.idToken}`,
      }),
      responseType: 'blob' as 'json'
    }
  )}
  public updateProcess(id:any, process:any){
    return this.http.put('/api/process/update/' + `${id}`, process, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.idToken}`
      }),
    });
  }
  public updatePdf(id:any, pdf:any){
    return this.http.put('/api/update/' + `${id}`, pdf, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.idToken}`
      }),
    });
  }
  public search(search:string){
    return this.http.get('/api/process/search/' + `${search}`, this.headers)
  }
}
