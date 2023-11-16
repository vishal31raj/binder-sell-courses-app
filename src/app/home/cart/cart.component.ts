import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartItems: any[] | undefined;
  totalAmount: number | undefined;

  constructor(private stateService: StateService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getCurrentCartItems();
  }

  getCurrentCartItems() {
    this.stateService.cartItems.subscribe((items) => {
      console.log('Dashboard cart items', items);
      this.cartItems = items;
      this.getTotalAmount(this.cartItems);
    });
  }

  getTotalAmount(items: any[]) {
    this.totalAmount = 0;
    for (let item of items) {
      this.totalAmount = this.totalAmount + parseInt(item.discountedPrice.split('₹')[1]);
    }
    console.log("total amount", this.totalAmount);
  }

  removeItemFromCart(course: any) {
    this.cartItems = this.cartItems!.filter(
      (item) => item.courseName !== course.courseName
    );
    this.stateService.cartItems.next(this.cartItems);
    this.toastr.success('Course removed from cart!');
    this.getTotalAmount(this.cartItems);
  }

  onCheckout() {
    this.cartItems = [];
    this.stateService.cartItems.next(this.cartItems);
    this.toastr.success('Order placed successfully!');
  }

}
