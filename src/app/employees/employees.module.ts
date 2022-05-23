import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeesRoutingModule } from './employees-routing.module';
import { EmployeesComponent } from './employees.component';
import { EmployeeFormDialogComponent } from './employee-form-dialog/employee-form-dialog.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { MaterialModule } from '../material/material.module';
import { EMPLOYEE } from './store/employee.state';
import { reducers } from './store/employee.reducers';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { EmployeesEffects } from './store/employee.effects';
import { GenderNamePipe } from '../pipes/gender-name.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FullPhoneMaskDirective } from '../directives/full-phone-mask.directive';

@NgModule({
  declarations: [
    GenderNamePipe,
    FullPhoneMaskDirective,
    EmployeesComponent,
    EmployeeFormDialogComponent,
    ConfirmationDialogComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    EmployeesRoutingModule,
    StoreModule.forFeature(EMPLOYEE, reducers),
    EffectsModule.forFeature([EmployeesEffects]),
  ],
})
export class EmployeesModule {}
