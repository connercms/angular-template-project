import { Injectable } from '@angular/core';
import { USERS } from './mock-users';
import { User } from './user.interface';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from '../message.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersUrl = '/api/users';

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  getUsers(): Observable<User[]> {
    const users = of(USERS);
    this.log('UserService: Fetched users');
    return users;
  }

  // getUsers(): Observable<User[]> {
  //   return this.http.get<User[]>(this.usersUrl).pipe(
  //     tap(_ => this.log('fetched users')),
  //     catchError(this.handleError<User[]>('getUsers', []))
  //   );
  // }

  getUser(id: number): Observable<User> {
    const user = USERS.find(user => user.id === id);
    this.log(`UserService: fetched user id=${user.id}`);
    return of(user);
  }

  /* GET heroes whose name contains search term */
  searchUsers(term: string): Observable<User[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    // return this.http.get<User[]>(`${this.heroesUrl}/?name=${term}`).pipe(
    //   tap(x => x.length ?
    //      this.log(`found heroes matching "${term}"`) :
    //      this.log(`no heroes matching "${term}"`)),
    //   catchError(this.handleError<Hero[]>('searchHeroes', []))
    // );
    return this.getUsers().pipe(
      tap(x =>
        x.length
          ? this.log(`found users matching "${term}"`)
          : this.log(`no useres matching "${term}"`)
      ),
      map(users =>
        users.filter(
          user => user.name.toLowerCase().indexOf(term.toLowerCase()) !== -1
        )
      ),
      catchError(this.handleError<User[]>('searchUsers', []))
    );
  }

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
