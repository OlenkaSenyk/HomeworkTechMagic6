import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private users: User[] = [
    {
      id: 1,
      firstname: 'Jack',
      lastname: 'Swan',
      email: 'Jack.swan@april.biz',
      phone: '1-234-567-8901 x12345',
    },
    {
      id: 2,
      firstname: 'Emily',
      lastname: 'Spring',
      email: 'emily.spring@gmail.com',
      phone: '1-987-654-3212 x98765',
    },
    {
      id: 3,
      firstname: 'Anna',
      lastname: 'Winter',
      email: 'Anna.winter@gmail.com',
      phone: '1-357-924-6808 x67893',
    },
    {
      id: 4,
      firstname: 'James',
      lastname: 'Summer',
      email: 'james.summer@april.biz',
      phone: '1-246-801-3579 x34667',
    },
    {
      id: 5,
      firstname: 'Ellie',
      lastname: 'Autumn',
      email: 'ellie.autumn@gmail.com',
      phone: '1-214-365-8709 x43278',
    },
  ];

  constructor() {}

  getUsers(): User[] {
    return this.users;
  }
}
