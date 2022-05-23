import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Employee } from '../models/employee.model';
import * as moment from 'moment';

@Component({
  selector: 'app-employee-form-dialog',
  templateUrl: './employee-form-dialog.component.html',
  styleUrls: ['./employee-form-dialog.component.css'],
})
export class EmployeeFormDialogComponent implements OnInit {
  formGroup: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<EmployeeFormDialogComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: { employee: Employee }
  ) {}

  ngOnInit() {
    this.initForm(this.data?.employee || null);
  }

  initForm(employee?: Employee) {
    let emailregex: RegExp =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    this.formGroup = this.formBuilder.group({
      id: [employee?.id],
      email: [
        employee?.email,
        [Validators.required, Validators.pattern(emailregex)],
      ],
      fullName: [employee?.fullName, Validators.required],
      phone: [employee?.phone, Validators.required],
      position: [employee?.position, Validators.required],
      dob: [
        employee?.dob ? moment(employee?.dob)?.toDate() : null,
        Validators.required,
      ],
      gender: [
        employee?.gender !== null && employee?.gender !== undefined
          ? employee?.gender
          : true,
        Validators.required,
      ],
      company: [employee?.company, Validators.required],
    });
  }

  getErrorEmail() {
    return this.formGroup.get('email').hasError('required')
      ? 'Email address is required'
      : this.formGroup.get('email').hasError('pattern')
      ? 'Email address is not valid'
      : '';
  }

  onSubmit() {
    //TODO: update tree validation
    if (this.formGroup.valid) {
      const data = this.formGroup.value;
      data.dob = moment(data.dob).format('MMM DD, YYYY h:mm A');
      this.dialogRef.close(data);
    }
  }
}
