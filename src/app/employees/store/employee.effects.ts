import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EmployeesActions } from './employee.actions';
import { map, switchMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { EmployeesService } from '../services/employees.service';

@Injectable()
export class EmployeesEffects {
  fetchEmployee$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeesActions.fetchEmployees),
      switchMap((action) =>
        this.employeesService
          .getEmployees(action)
          .pipe(
            map((results) => EmployeesActions.fetchEmployeesSuccess(results))
          )
      )
    )
  );

  addEmployee$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeesActions.addEmployee),
      switchMap((action) =>
        this.employeesService
          .addEmployee(action.employee)
          .pipe(map((results) => EmployeesActions.addEmployeeSuccess(results)))
      )
    )
  );

  updateEmployee$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeesActions.updateEmployee),
      switchMap((action) =>
        this.employeesService
          .updateEmployee(action.employee, action.id)
          .pipe(
            map((results) => EmployeesActions.updateEmployeeSuccess(results))
          )
      )
    )
  );

  deleteEmployee$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeesActions.deleteEmployee),
      switchMap((action) =>
        this.employeesService
          .deleteEmployee(action.id)
          .pipe(map(() => EmployeesActions.deleteEmployeeSuccess(action.id)))
      )
    )
  );

  constructor(
    private actions$: Actions,
    private store$: Store,
    private employeesService: EmployeesService
  ) {}
}
