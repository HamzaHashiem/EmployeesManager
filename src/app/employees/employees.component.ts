import { Component, HostListener, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { Employee } from './models/employee.model';
import { EmployeesActions } from './store/employee.actions';
import { BaseComponent } from '../base-component/base-component';
import { getEmployees } from './store/employee.selectors';
import { EmployeeFormDialogComponent } from './employee-form-dialog/employee-form-dialog.component';
import {
  ConfirmationDialogComponent,
  DialogResult,
} from './confirmation-dialog/confirmation-dialog.component';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],
})
export class EmployeesComponent extends BaseComponent implements OnInit {
  timeout: any = null;
  dataSource: Employee[];
  isLoading = true;
  displayedColumns: string[] = [
    'fullName',
    'email',
    'dob',
    'gender',
    'phone',
    'company',
    'position',
    'actions',
  ];
  IsMobile: boolean = window.innerWidth <= 959;

  pageIndex = '1';
  pageSize = '10';
  fullNameSearch = '';
  emailSearch = '';
  companySearch = '';

  constructor(private store: Store, private dialog: MatDialog) {
    super();
  }

  @HostListener('window:resize', [])
  onResize() {
    this.IsMobile = window.innerWidth <= 959;
    if (this.IsMobile) {
      this.displayedColumns = ['fullName', 'email', 'actions'];
    } else {
      this.displayedColumns = [
        'fullName',
        'email',
        'dob',
        'gender',
        'phone',
        'company',
        'position',
        'actions',
      ];
    }
  }

  ngOnInit(): void {
    if (window.innerWidth <= 959) {
      this.displayedColumns = ['fullName', 'email', 'actions'];
    } else {
      this.displayedColumns = [
        'fullName',
        'email',
        'dob',
        'gender',
        'phone',
        'company',
        'position',
        'actions',
      ];
    }

    this.store.dispatch(EmployeesActions.fetchEmployees());

    this.subscriptions.add(
      this.store.select(getEmployees).subscribe((data) => {
        this.dataSource = data || [];
        this.isLoading = false;
      })
    );
  }

  addEmployee() {
    const dialogRef = this.dialog.open(EmployeeFormDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(async (employee: Employee) => {
      if (employee) {
        this.isLoading = true;
        this.store.dispatch(EmployeesActions.addEmployee(employee));
      }
    });
  }

  editEmployee(employee: Employee) {
    const dialogRef = this.dialog.open(EmployeeFormDialogComponent, {
      width: '400px',
      data: {
        employee,
      },
    });

    dialogRef.afterClosed().subscribe(async (employee: Employee) => {
      if (employee) {
        this.isLoading = true;
        this.store.dispatch(
          EmployeesActions.updateEmployee(employee, employee.id)
        );
      }
    });
  }

  deleteEmployee(id: string) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);
    dialogRef.afterClosed().subscribe(async (dialogResult: DialogResult) => {
      if (dialogResult === DialogResult.Yes) {
        this.isLoading = true;
        this.store.dispatch(EmployeesActions.deleteEmployee(id));
      }
    });
  }

  applyKeywordFilter(event, type): void {
    var $this = this;
    clearTimeout(this.timeout);

    if (event.keyCode == 13) {
      clearTimeout(this.timeout);
      switch (type) {
        case 'name':
          $this.searchName(event.target.value);
          break;
        case 'email':
          $this.searchEmail(event.target.value);
          break;
        case 'comapny':
          $this.searchCompany(event.target.value);
          break;
      }
    }

    this.timeout = setTimeout(function () {
      if (event.keyCode != 13) {
        switch (type) {
          case 'name':
            $this.searchName(event.target.value);
            break;
          case 'email':
            $this.searchEmail(event.target.value);
            break;
          case 'comapny':
            $this.searchCompany(event.target.value);
            break;
        }
      }
    }, 800);
  }

  searchName(value: string) {
    this.fullNameSearch = value;
    this.isLoading = true;
    this.store.dispatch(
      EmployeesActions.fetchEmployees(
        this.pageIndex,
        this.pageSize,
        this.fullNameSearch,
        this.emailSearch,
        this.companySearch
      )
    );
  }

  searchEmail(value: string) {
    this.emailSearch = value;
    this.isLoading = true;
    this.store.dispatch(
      EmployeesActions.fetchEmployees(
        this.pageIndex,
        this.pageSize,
        this.fullNameSearch,
        this.emailSearch,
        this.companySearch
      )
    );
  }

  searchCompany(value: string) {
    this.companySearch = value;
    this.isLoading = true;
    this.store.dispatch(
      EmployeesActions.fetchEmployees(
        this.pageIndex,
        this.pageSize,
        this.fullNameSearch,
        this.emailSearch,
        this.companySearch
      )
    );
  }

  get canPreviousPage(): boolean {
    return Number(this.pageIndex) > 1;
  }

  get canNextPage(): boolean {
    return this.dataSource && this.dataSource.length >= Number(this.pageSize);
  }

  goPreviousPage() {
    this.pageIndex = (Number(this.pageIndex) - 1).toString();
    this.isLoading = true;
    this.store.dispatch(
      EmployeesActions.fetchEmployees(
        this.pageIndex,
        this.pageSize,
        this.fullNameSearch,
        this.emailSearch,
        this.companySearch
      )
    );
  }

  goNextPage() {
    this.pageIndex = (Number(this.pageIndex) + 1).toString();
    this.isLoading = true;
    this.store.dispatch(
      EmployeesActions.fetchEmployees(
        this.pageIndex,
        this.pageSize,
        this.fullNameSearch,
        this.emailSearch,
        this.companySearch
      )
    );
  }
}
