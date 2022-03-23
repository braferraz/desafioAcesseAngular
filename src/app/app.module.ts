import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProcessFormComponent } from './process-form/process-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { ProcessEditComponent } from './process-edit/process-edit.component';
import { ProcessListComponent } from './process-list/process-list.component';
import { LoginComponent } from './login/login.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { AuthGuardService } from './guards/auth-guard.service';
import { LoginService } from './shared/login.service';

@NgModule({
  declarations: [ 
    AppComponent,
    ProcessFormComponent,
    ProcessEditComponent,
    ProcessListComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatSelectModule,
    MatTableModule,
    MatDialogModule,
    MatIconModule,
    HttpClientModule,
    NgxPaginationModule
  ],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'pt-BR' }, AuthGuardService, LoginService],
  bootstrap: [AppComponent],
})
export class AppModule { }
