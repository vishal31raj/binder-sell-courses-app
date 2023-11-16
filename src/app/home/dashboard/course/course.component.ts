import { Component, OnInit } from '@angular/core';
import { StateService } from 'src/app/services/state.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
})
export class CourseComponent implements OnInit {
  bannerText = 'Discover Latest Courses on React';
  course: any;

  currentWishlistedItems: any[] | undefined;
  currentCartItems: any[] | undefined;

  videoUrl: string = 'https://youtu.be/t0Q2otsqC4I?si=_oHuJsHAByRnI5FH';

  constructor(
    private stateService: StateService,
    private toastr: ToastrService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.getCurrentCourse();
    this.getCurrentCartItems();
    this.getWishlistedCourses();
  }

  getCurrentCartItems() {
    this.stateService.cartItems.subscribe((items: any[]) => {
      this.currentCartItems = items;
    });
  }

  getWishlistedCourses() {
    this.stateService.wishlistItems.subscribe((items: any[]) => {
      this.currentWishlistedItems = items;
    });
  }

  getCurrentCourse() {
    this.stateService.activeCourse.subscribe((course) => {
      this.course = course;
      console.log('selectedCourse', this.course);
    });
  }

  getVideoUrl(): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.videoUrl);
  }

  onToggleWishlist(course: any, type: boolean) {
    if (type === true) {
      this.course.isWishlisted = true;

      this.currentWishlistedItems?.push(course);
      this.stateService.wishlistItems.next(this.currentWishlistedItems!);
      this.toastr.success('Course added to wishlist!');
    } else if (type === false) {
      this.course.isWishlisted = false;

      this.currentWishlistedItems = this.currentWishlistedItems?.filter(
        (item) => item.courseName !== course.courseName
      );
      this.stateService.wishlistItems.next(this.currentWishlistedItems!);
      this.toastr.error('Course removed from wishlist!');
    }
  }

  addToCart(course: any) {
    for (let item of this.currentCartItems!) {
      if (item.courseName === course.courseName) {
        this.toastr.error('Course already exists in your cart!');
        return;
      }
    }
    this.currentCartItems!.push(course);
    this.stateService.cartItems.next(this.currentCartItems!);
    this.toastr.success('Course added to cart!');
  }
}
