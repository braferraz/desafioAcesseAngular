import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../shared/login.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  constructor(private loginService: LoginService, private router:Router) { }

  ngOnInit(): void {
    this.createForm()
  }

  onSubmit(loginForm:FormGroup){
    this.router.navigate(['/processos']);
    this.loginService.getToken(loginForm.value);
  }
  
  createForm() {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required])
    })
  }
}
