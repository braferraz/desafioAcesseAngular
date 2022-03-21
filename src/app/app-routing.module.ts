import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProcessEditComponent } from './process-edit/process-edit.component';
import { ProcessFormComponent } from './process-form/process-form.component';
import { ProcessListComponent } from './process-list/process-list.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'processos', component: ProcessListComponent},
  { path: 'processos/novo', component: ProcessFormComponent },
  { path: 'processos/editar/:id', component: ProcessEditComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
