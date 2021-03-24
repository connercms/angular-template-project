import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';

/**
 * https://angular.io/guide/providers#provider-scope
 * You should always provide your service in the root injector
 * unless there is a case where you want the service to be available
 * only if the consumer imports a particular @NgModule.
 */
@Injectable({
  /**
   * Specify the module you want service to be provided in. For example,
   * this could specify this service to be provided in the User module only
   */
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  login(): Observable<boolean> {
    return of(true).pipe(
      delay(1000),
      tap(val => (this.isLoggedIn = true))
    );
  }

  logout(): void {
    this.isLoggedIn = false;
  }
}
