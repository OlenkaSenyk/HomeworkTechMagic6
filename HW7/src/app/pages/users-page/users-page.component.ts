import { Component } from '@angular/core';
import { UsersService } from '../../core/services/users.service';
import { User } from '../../core/interfaces/user';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { AddUserDialogComponent } from '../add-user-dialog/add-user-dialog.component';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.css'],
})
export class UsersPageComponent {
  users: User[] = [];
  searchValue: string = '';

  constructor(private usersService: UsersService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.usersService.getAllUsers().subscribe({
      next: (data) => (this.users = data),
      error: (error) => alert(error.message),
    });
  }

  onSelectUsers($event: MatCheckboxChange) {
    const id = $event.source.value;
    const isChecked = $event.checked;

    this.users.map((u) => {
      if (u.id == Number(id)) {
        u.select = isChecked;
      }
    });
  }

  onDelete() {
    const selectedUsers = this.users.filter((u) => u.select);
    const forDelete = selectedUsers.map((u) => u.id);

    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].select) forDelete[i] = this.users[i].id;
    }

    for (let i = 0; i < forDelete.length; i++) {
      let temp = true;
      this.usersService.deleteUser(forDelete[i]).subscribe({
        next: () => {
          const index = this.users.findIndex((u) => u.id === forDelete[i]);
          if (index > -1) {
            this.users.splice(index, 1);
          }
          temp = true;
        },
        error: (error) => {
          alert(error.message);
          temp = false;
        },
      });
      if (!temp) break;
    }
  }

  onAdd() {
    let user: User = {
      id: this.users.length + 1,
      name: '',
      email: '',
      phone: '',
    };

    const dialog = this.dialog.open(AddUserDialogComponent, {
      data: user,
    });

    dialog.afterClosed().subscribe({
      next: (data) => {
        user = data;
        if (user.id !== -1) {
          this.usersService.addUser(user).subscribe({
            next: () => {
              this.users.push(user);
            },
            error: (error) => alert(error.message),
          });
        }
      },
      error: (error) => alert(error.message),
    });
  }

  ifSelected(): boolean {
    let selected = this.users.filter((u) => u.select);
    return selected.length === 0;
  }

  onSelectAll() {
    const allSelected = this.users.every((u) => u.select);
    this.users.forEach((u) => (u.select = !allSelected));
  }

  onSortAll($event: Event) {
    let sortValue = ($event.target as HTMLInputElement).value;
    switch (sortValue) {
      case 'name':
        this.users.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'email':
        this.users.sort((a, b) => a.email.localeCompare(b.email));
        break;
      default:
        this.users.sort((a, b) => a.id - b.id);
        break;
    }
  }
}
