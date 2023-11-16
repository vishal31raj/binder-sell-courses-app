import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './home/dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { CourseComponent } from './home/dashboard/course/course.component';
import { CartComponent } from './home/cart/cart.component';
import { WishlistComponent } from './home/wishlist/wishlist.component';
import { ProfileComponent } from './home/profile/profile.component';
import { CourseListComponent } from './home/dashboard/course-list/course-list.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {
        path: 'courses',
        component: DashboardComponent,
        children: [
          {
            path: 'details',
            component: CourseComponent
          },
          {
            path: 'list',
            component: CourseListComponent
          },
          {
            path: '**',
            redirectTo: 'list',
            pathMatch: 'full'
          },
        ]
      },
      {
        path: 'cart',
        component: CartComponent
      },
      {
        path: 'wishlist',
        component: WishlistComponent
      },
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: '**',
        redirectTo: 'courses',
        pathMatch: 'full'
      },
    ]
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
