import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanDeactivateGuard } from '../can-deactivate.guard';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserResolverService } from './user-resolver.service';

const routes: Routes = [
  {
    path: 'users',
    children: [
      {
        path: '',
        component: UserListComponent,
        data: { animation: 'users' }
      },
      {
        path: ':id',
        component: UserDetailComponent,
        data: { animation: 'user' },
        canDeactivate: [CanDeactivateGuard],
        resolve: {
          user: UserResolverService
        }
      }
    ]
  }
];

@NgModule({
  /**
   * Only call RouterModule.forRoot() in the root AppRoutingModule
   * (or the AppModule if that's where you register top level application routes).
   * In any other module, you must call the RouterModule.forChild() method to register additional routes.
   */
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule {}
