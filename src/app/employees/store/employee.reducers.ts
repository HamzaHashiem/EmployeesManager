import { ActionReducerMap, createReducer, on } from '@ngrx/store';
import { Employee } from '../models/employee.model';
import { EmployeesActions } from './employee.actions';
import { EmployeeState } from './employee.state';

export const EmployeesReducer = createReducer(
  [] as Employee[],
  on(EmployeesActions.fetchEmployeesSuccess, (_, { employees }) => employees),
  on(EmployeesActions.addEmployeeSuccess, (state, { employee }) => [
    employee,
    ...(state ?? []),
  ]),
  on(EmployeesActions.updateEmployeeSuccess, (state, { employee }) => {
    return state.map((item) => {
      if (item.id === employee.id) {
        return employee;
      }
      return item;
    });
  }),
  on(EmployeesActions.deleteEmployeeSuccess, (state, { id }) => {
    const tempArr = [...state];
    const index = tempArr.findIndex(function (o) {
      return o.id === id;
    });
    if (index !== -1) tempArr.splice(index, 1);
    return tempArr as Employee[];
  })
);

export const reducers: ActionReducerMap<EmployeeState> = {
  employees: EmployeesReducer,
};
