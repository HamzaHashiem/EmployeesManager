import { Employee } from '../models/employee.model';

export interface EmployeeState {
  employees: Employee[];
}

export const EMPLOYEE = 'employee';
