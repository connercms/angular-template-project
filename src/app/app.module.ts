import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MessagesComponent } from './messages/messages.component';
import { AppRoutingModule } from './app-routing.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UsersModule } from './users/users.module';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { DashboardComponent } from './dashboard/dashboard.component';

// TODO: Research core module https://frontpills.com/posts/2019/core-shared-modules/#:%7E:text=The%20Core%20Module%20is%20a,in%20the%20application%20can%20use.

/**
 * Recommended pattern for Angular applications:
 * Each feature area resides in its own folder.
 * Each feature has its own Angular feature module.
 * Each area has its own area root component.
 * Each area root component has its own router outlet and child routes.Feature area routes rarely (if ever) cross with routes of other features.
 */
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    MessagesComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    /**
     * The order of route configuration is important,
     * because the router accepts the first route that matches a navigation request path.
     * Below, urls will first be analyzed against the users module, then the app routing module.
     * If you listed AppRoutingModule first, the wildcard route would be registered before the user routes.
     * The wildcard route—which matches every URL—would intercept the attempt to navigate to a user route
     * and display page not found.
     */
    // AdminModule, <--- Lazy loaded in router module, so import not needed here
    AuthModule,
    UsersModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
