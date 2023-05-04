import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { catchError, Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  APIUrl = 'https://jsonplaceholder.typicode.com/users/';
  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<User[]> {
    return this.http
      .get<User[]>(this.APIUrl)
      .pipe(catchError(this.handleError));
  }

  addUser(user: User) {
    return this.http.post(this.APIUrl, user).pipe(catchError(this.handleError));
  }

  deleteUser(id: number) {
    return this.http
      .delete(this.APIUrl + id)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(() => error);
  }
}
