import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-dashboard-cart',
  templateUrl: './dashboard-cart.component.html',
  styleUrls: ['./dashboard-cart.component.scss'],
})
export class DashboardCartComponent implements OnInit {
  cartItems: any[] | undefined;

  constructor(
    private stateService: StateService,
    private router: Router,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getCurrentCartItems();
  }

  getCurrentCartItems() {
    this.stateService.cartItems.subscribe((items) => {
      console.log('Dashboard cart items', items);
      this.cartItems = items;
    });
  }

  removeItemFromCart(course: any) {
    this.cartItems = this.cartItems!.filter(
      (item) => item.courseName !== course.courseName
    );
    this.stateService.cartItems.next(this.cartItems);
    this.toastr.success('Course removed from cart!');
  }

  navigateToCart() {
    this.router.navigate(['/home/cart'], { relativeTo: this.activatedRoute });
  }
}
