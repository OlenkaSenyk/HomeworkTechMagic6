import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from '../../core/interfaces/user';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-user-dialog',
  templateUrl: './add-user-dialog.component.html',
  styleUrls: ['./add-user-dialog.component.css'],
})
export class AddUserDialogComponent {
  form = new FormGroup({
    firstname: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    lastname: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(60),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d+$/),
    ]),
  });

  constructor(
    public dialog: MatDialogRef<AddUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public user: User
  ) {}

  onCancel(): void {
    this.user.id = -1;
    this.dialog.close(this.user);
  }

  onSubmit() {
    if (this.form.valid) {
      const firstname = this.form.get('firstname')?.value;
      const lastname = this.form.get('lastname')?.value;
      const email = this.form.get('email')?.value ?? '';
      const phone = this.form.get('phone')?.value ?? '';

      this.user.name = firstname + ' ' + lastname;
      this.user.email = email;
      this.user.phone = phone;

      this.dialog.close(this.user);
    }
  }
}
