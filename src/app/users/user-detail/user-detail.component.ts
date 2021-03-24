import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { DialogService } from 'src/app/dialog.service';
import { User } from '../user.interface';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  user?: User;

  constructor(
    private dialogService: DialogService,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private location: Location
  ) {}

  ngOnInit() {
    /**
     * The switchMap operator does two things.
     * It flattens the Observable<User[]> that UserService returns and cancels previous pending requests.
     * If the user re-navigates to this route with a new id while the service is still retrieving the old id, switchMap discards that old request and returns the hero for the new id.
     *
     * By default, the router re-uses a component instance when it re-navigates to the same component type without visiting a different component first. The route parameters could change each time.
     * You wouldn't want the router to remove the current component instance from the DOM only to re-create it for the next id as this would re-render the view. For better UX,
     * the router re-uses the same component instance and updates the parameter.
     * Since ngOnInit() is only called once per component instantiation, you can detect when the route parameters change from within the same instance using the observable paramMap property.
     *
     * When subscribing to an observable in a component, you almost always unsubscribe when the component is destroyed.
     * However, ActivatedRoute observables are among the exceptions because ActivatedRoute and its observables are insulated from the Router itself.
     * The Router destroys a routed component when it is no longer needed along with the injected ActivatedRoute.
     */
    // this.route.paramMap
    //   .pipe(
    //     switchMap((params: ParamMap) =>
    //       this.userService.getUser(+params.get('id'))
    //     )
    //   )
    //   .subscribe(user => (this.user = user));

    // When you know for certain that a component instance will never be re-used, you can use snapshot.
    this.route.data.subscribe((data: { user: User }) => {
      this.user = data.user;
    });
  }

  /**
   * Lazy example of how to use deactivate - could be used to check if form is in progress, etc.
   */
  canDeactivate(): Observable<boolean> | boolean {
    // Otherwise ask the user with the dialog service and return its
    // observable which resolves to true or false when the user decides
    return this.dialogService.confirm('Navigate away?');
  }

  goBack(): void {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining
    const id = this.user ? this.user.id : null;
    // '../' to go back one level
    this.router.navigate(['../', { id }]);
    // this.location.back();
  }
}
