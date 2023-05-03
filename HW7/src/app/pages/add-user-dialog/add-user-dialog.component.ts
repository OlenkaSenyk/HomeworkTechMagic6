import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {User} from "../../core/interfaces/user";

@Component({
  selector: 'app-add-user-dialog',
  templateUrl: './add-user-dialog.component.html',
  styleUrls: ['./add-user-dialog.component.css']
})
export class AddUserDialogComponent {
  constructor(public dialog: MatDialogRef<AddUserDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public user: User) { }
  onCancel(): void {
    this.dialog.close();
  }
}
