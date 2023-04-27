import { Component } from '@angular/core';
import { UserService } from '../core/services/user.service';
import { User } from '../core/interfaces/user';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css'],
})
export class UserPageComponent {
  users: User[] = [];
  private images: string[] = [
    'https://www.mutleyssnaps.co.uk/wp-content/uploads/2020/08/Pet-photography-scotland-dogs-and-cats-3.jpg',
    'https://www.owlkids.com/wp-content/uploads/2014/11/skates.jpg',
    'https://img.freepik.com/premium-photo/red-apples-isolated-white-background_299651-65.jpg?w=2000',
    'https://media.istockphoto.com/id/1140541722/photo/modern-laptop-on-white-background.jpg?s=170667a&w=0&k=20&c=T00CzYcAaqwrlZHuF1UgioIorHni-wy-AJ22rhOYt4I=',
    'https://media.istockphoto.com/id/502935480/photo/yellow-leather-womens-tote-handbag-on-white-background.jpg?s=612x612&w=0&k=20&c=ptNjC-jJmFRNhx-tGcEt2hMwgdFXd5nxpjIh9LFs_qo=',
  ];

  searchValue: string = '';

  constructor(private usersService: UserService) {}

  ngOnInit(): void {
    this.users = this.usersService.getUsers();
    this.users.forEach((u) => (u.select = false));
    for (let i = 0; i < this.users.length; i++)
      this.users[i].image = this.images[i];
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
    this.users = this.users.filter((u) => !u.select);
  }

  ifSelected(): boolean {
    let selected = this.users.filter((u) => u.select);
    return selected.length === 0;
  }

  onSelectAll() {
    let selected = this.users.filter((u) => u.select);
    if (selected.length === this.users.length)
      this.users.forEach((u) => (u.select = false));
    else this.users.forEach((u) => (u.select = true));
  }

  onSortAll($event: Event) {
    let sortValue = ($event.target as HTMLInputElement).value;
    switch (sortValue) {
      case 'firstname':
        this.users.sort((a, b) => a.firstname.localeCompare(b.firstname));
        break;
      case 'lastname':
        this.users.sort((a, b) => a.lastname.localeCompare(b.lastname));
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
