import { createAction } from '@ngrx/store';
import { Employee } from '../models/employee.model';

const fetchEmployees = createAction(
  '[Employees] Fetch Employees',
  (
    pageIndex?: string,
    pageSize?: string,
    name?: string,
    email?: string,
    company?: string
  ) => ({ pageIndex, pageSize, name, email, company })
);
const fetchEmployeesSuccess = createAction(
  '[Employees] Fetch Employees Success',
  (employees: Employee[]) => ({ employees })
);

const addEmployee = createAction(
  '[Employees] Add employee',
  (employee: Employee) => ({ employee })
);
const addEmployeeSuccess = createAction(
  '[Employees] Add employee Success',
  (employee: Employee) => ({ employee })
);

const updateEmployee = createAction(
  '[Employees] Update employee',
  (employee: Employee, id: string) => ({ employee, id })
);
const updateEmployeeSuccess = createAction(
  '[Employees] Update employee Success',
  (employee: Employee) => ({ employee })
);

const deleteEmployee = createAction(
  '[Employees] Delete employee',
  (id: string) => ({ id })
);
const deleteEmployeeSuccess = createAction(
  '[Employees] Delete employee Success',
  (id: string) => ({ id })
);

export const EmployeesActions = {
  fetchEmployees,
  fetchEmployeesSuccess,
  addEmployee,
  addEmployeeSuccess,
  updateEmployee,
  updateEmployeeSuccess,
  deleteEmployee,
  deleteEmployeeSuccess,
};
