import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EMPLOYEE, EmployeeState } from './employee.state';

const featureSelector = createFeatureSelector<EmployeeState>(EMPLOYEE);

export const getEmployees = createSelector(
  featureSelector,
  (state) => state?.employees
);
