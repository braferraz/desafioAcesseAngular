import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProcessFormComponent } from './process-form/process-form.component';

const routes: Routes = [
  {path: 'process/new', component: ProcessFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
