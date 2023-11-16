import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './home/dashboard/dashboard.component';
import { CartComponent } from './home/cart/cart.component';
import { WishlistComponent } from './home/wishlist/wishlist.component';
import { ProfileComponent } from './home/profile/profile.component';
import { CourseComponent } from './home/dashboard/course/course.component';
import { BannerComponent } from './utils/banner/banner.component';
import { DashboardCartComponent } from './utils/dashboard-cart/dashboard-cart.component';
import { ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    DashboardComponent,
    CartComponent,
    WishlistComponent,
    ProfileComponent,
    CourseComponent,
    BannerComponent,
    DashboardCartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-bottom-right'
    })
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
