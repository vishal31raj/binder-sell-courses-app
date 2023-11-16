import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss'],
})
export class CourseListComponent implements OnInit {
  bannerText = 'Discover Latest Courses on Angular';

  coursesList: any[] | undefined;
  tempCoursesList: any[] | undefined;
  paginatedCoursesList: any[] | undefined;

  pagination = {
    pages: [1],
    activePage: 1,
    coursesPerPage: 4,
  };
  filters = {
    searchInput: '',
  };

  currentCartItems: any[] | undefined;
  currentWishlistedItems: any[] | undefined;

  constructor(
    private apiService: ApiService,
    private stateService: StateService,
    private toastr: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getAllCourses();
  }

  getCurrentCartItems() {
    this.stateService.cartItems.subscribe((items: any[]) => {
      this.currentCartItems = items;
    });
  }

  onToggleWishlist(course: any, type: boolean) {
    if (type === true) {
      this.tempCoursesList!.find(
        (item: any) => item.courseName === course.courseName
      ).isWishlisted = true;

      this.currentWishlistedItems?.push(course);
      this.stateService.wishlistItems.next(this.currentWishlistedItems!);
      this.toastr.success('Course added to wishlist!');
    } else if (type === false) {
      this.tempCoursesList!.find(
        (item: any) => item.courseName === course.courseName
      ).isWishlisted = false;

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

  onChangeSearchInput(event: any) {
    this.tempCoursesList = [];
    for (let course of this.coursesList!) {
      if (
        course.courseName
          .toUpperCase()
          .includes(event.target.value.toUpperCase()) ||
        course.author.toUpperCase().includes(event.target.value.toUpperCase())
      ) {
        this.tempCoursesList?.push(course);
      }
    }
    console.log(this.tempCoursesList);
    this.setPagination(this.tempCoursesList);
  }

  getAllCourses() {
    this.apiService.getAllCourses().subscribe((res: any) => {
      this.coursesList = this.tempCoursesList = this.setDiscountedPrice(res);
      console.log('all courses', this.tempCoursesList);
      this.setPagination(this.tempCoursesList);
      this.getCurrentCartItems();
    });
  }

  setDiscountedPrice(arr: any[]) {
    for (let item of arr) {
      if (item.discountPercentage !== '0') {
        item.discountedPrice =
          '₹' +
          Math.floor(
            parseInt(item.actualPrice.split('₹')[1]) *
              ((100 - parseInt(item.discountPercentage.split('%'))) / 100)
          );
        // console.log(newPrice);
      } else {
        item.discountedPrice = item.actualPrice;
      }
    }
    this.getWishlistedCourses(arr);
    return arr;
  }

  getWishlistedCourses(arr: any[]) {
    for (let item of arr) {
      item.isWishlisted = false;
    }

    this.stateService.wishlistItems.subscribe((items: any[]) => {
      this.currentWishlistedItems = items;

      if (this.currentWishlistedItems.length > 0) {
        for (let course of arr) {
          for (let item of this.currentWishlistedItems) {
            if (course.courseName === item.courseName) {
              course.isWishlisted = true;
            }
          }
        }
      }
    });
  }

  setPagination(arr: any[]) {
    this.pagination.pages = [];
    // this.pagination = {
    //   pages: [],
    //   activePage: 1,
    //   coursesPerPage: 4,
    // };
    for (
      let i = 0;
      i <= Math.floor(arr.length / this.pagination.coursesPerPage);
      i++
    ) {
      this.pagination.pages.push(i + 1);
      if (arr.length === this.pagination.coursesPerPage) {
        break;
      }
    }
    console.log(this.pagination);
    this.onClickPaginationItem(1);
  }

  onChangePageCount(event: any) {
    if (
      parseInt(event.target.value) < 1 ||
      parseInt(event.target.value) > this.tempCoursesList!.length
    ) {
      alert(
        'Count per page should be between 1 and ' + this.tempCoursesList!.length
      );
    } else {
      this.pagination.coursesPerPage = parseInt(event.target.value);
      this.setPagination(this.tempCoursesList!);
    }
  }

  onClickPaginationItem(count: number) {
    this.pagination.activePage = count;

    this.paginatedCoursesList = this.tempCoursesList;
    this.paginatedCoursesList = this.paginatedCoursesList
      ?.filter((item: any) => {
        return (
          this.tempCoursesList?.indexOf(item)! >=
          (count - 1) * this.pagination.coursesPerPage
        );
      })
      .slice(0, this.pagination.coursesPerPage);
    console.log(this.paginatedCoursesList);
  }

  onChangeSort(id: any) {
    console.log(id);
    if (id === 1) {
      this.tempCoursesList?.sort((a, b) => {
        return (
          parseInt(a.discountedPrice.split('₹')[1]) -
          parseInt(b.discountedPrice.split('₹')[1])
        );
      });
    } else if (id === 2) {
      this.tempCoursesList?.sort((a, b) => {
        return (
          parseInt(b.discountedPrice.split('₹')[1]) -
          parseInt(a.discountedPrice.split('₹')[1])
        );
      });
    }
    console.log(this.tempCoursesList);
    this.setPagination(this.tempCoursesList!);
  }

  onReset() {
    this.filters.searchInput = '';
    this.tempCoursesList = this.coursesList;
    this.setPagination(this.tempCoursesList!);
  }

  onNavigateToDetails(course: any) {
    this.stateService.activeCourse.next(course);
    this.router.navigate(["../details"], {relativeTo: this.activatedRoute});
  }
}
