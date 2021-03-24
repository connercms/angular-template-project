import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MessagesComponent } from './messages/messages.component';
import { AuthGuard } from './auth/auth.guard';

/**
 * 'full' results in a route hit when the remaining, unmatched segments of the URL match ''.
 * 'prefix' tells the router to match the redirect route when the remaining URL begins with the redirect route's prefix path
 */

// App level routes should typically only contain the default and wildcard route, named outlets, or lazy loaded module paths
const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    canLoad: [AuthGuard] // <-- canLoad: Used to guard lazy loaded modules. Good for not loading areas that first require auth
  },
  { path: 'messages', component: MessagesComponent, outlet: 'popup' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  /**
   * The method is called forRoot() because you configure the router at the application's root level.
   * The forRoot() method supplies the service providers and directives needed for routing,
   * and performs the initial navigation based on the current browser URL.
   *
   * Only call RouterModule.forRoot() in the root AppRoutingModule
   * (or the AppModule if that's where you register top level application routes).
   * In any other module, you must call the RouterModule.forChild() method to register additional routes.
   *
   * Routes provided by feature modules are combined together into their imported module's routes by the router.
   * This allows you to continue defining the feature module routes without modifying the main route configuration.
   **/
  imports: [
    RouterModule.forRoot(routes, {
      enableTracing: false, // <-- true for debugging purposes only
      /**
       * This configures the Router preloader to immediately load all lazy loaded routes (routes with a loadChildren property).
       * The PreloadAllModules strategy does not load feature areas protected by a CanLoad guard.
       * For more on preloading and custom preloading strategies:
       * https://angular.io/guide/router-tutorial-toh#preloading-background-loading-of-feature-areas
       */
      preloadingStrategy: PreloadAllModules
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
