import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
 
  constructor(private http: HttpClient,
    private route: Router) { }

  tokenUsuario:any
  getToken(user:any) {
    return this.http.post("/api/login", JSON.stringify(user), {responseType: 'text'}).subscribe(res =>{
      var arr = res.split(" ");
      var token = arr[0];
      var name = arr[1];
      localStorage.setItem("token", token);
      localStorage.setItem("name", name);
      if(token != null){
        this.route.navigate(['/processos']);
      }
    })
  }

}
