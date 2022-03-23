import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './guards/auth-guard.service';
import { LoginComponent } from './login/login.component';
import { ProcessEditComponent } from './process-edit/process-edit.component';
import { ProcessFormComponent } from './process-form/process-form.component';
import { ProcessListComponent } from './process-list/process-list.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'processos', component: ProcessListComponent, canActivate:[AuthGuardService]},
  { path: 'processos/novo', component: ProcessFormComponent, canActivate:[AuthGuardService] },
  { path: 'processos/editar/:id', component: ProcessEditComponent, canActivate:[AuthGuardService] },
  { path: '', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
