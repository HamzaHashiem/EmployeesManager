import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeesService {
  baseUrl = 'https://retoolapi.dev/DV6x5A/employees';
  constructor(private httpClient: HttpClient) {}

  // Fetch
  getEmployees(action: {
    pageIndex: string;
    pageSize: string;
    name: string;
    email: string;
    company: string;
  }): Observable<Employee[]> {
    let params = new HttpParams()
      .set('_page', action.pageIndex || '1')
      .set('_limit', action.pageSize || '10');
    if (action.name) {
      params = params.append('fullName', action.name);
    }
    if (action.company) {
      params = params.append('company', action.company);
    }
    if (action.email) {
      params = params.append('email', action.email);
    }
    return this.httpClient.get<Employee[]>(this.baseUrl, { params });
  }

  // Add
  addEmployee(employee: Employee): Observable<Employee> {
    return this.httpClient.post<Employee>(this.baseUrl, employee);
  }

  // Update
  updateEmployee(employee: Employee, id: string): Observable<Employee> {
    return this.httpClient.put<Employee>(`${this.baseUrl}/${id}`, employee);
  }

  // Delete
  deleteEmployee(id: string): Observable<any> {
    return this.httpClient.delete<any>(`${this.baseUrl}/${id}`);
  }
}
