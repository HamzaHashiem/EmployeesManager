import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css'],
})
export class ConfirmationDialogComponent implements OnInit {
  constructor(private dialogRef: MatDialogRef<ConfirmationDialogComponent>) {}

  ngOnInit(): void {}

  cancel(): void {
    this.dialogRef.close(DialogResult.No);
  }

  confirm(): void {
    this.dialogRef.close(DialogResult.Yes);
  }
}

export enum DialogResult {
  No = 0,
  Yes = 1,
}
