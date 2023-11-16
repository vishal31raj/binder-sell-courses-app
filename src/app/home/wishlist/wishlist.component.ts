import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss'],
})
export class WishlistComponent implements OnInit {
  wishlistedItems: any[] | undefined;
  cartItems: any;
  constructor(private stateService: StateService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.getWishlist();
    this.getCartItems();
  }

  getCartItems() {
    this.stateService.cartItems.subscribe((cartItems) => {
      this.cartItems = cartItems;
    })
  }

  getWishlist() {
    this.stateService.wishlistItems.subscribe((items) => {
      console.log('Wishlist from Wishlist', items);
      this.wishlistedItems = items;
    });
  }

  onRemoveWishlistedItem(course: any) {
    this.wishlistedItems = this.wishlistedItems?.filter(
      (item: any) => item.courseName !== course.courseName
    );
    console.log(this.wishlistedItems);
    this.stateService.wishlistItems.next(this.wishlistedItems!);
    this.toastr.error('Course removed from wishlist!');
  }

  onAddItemToCart(course: any) {
    for (let item of this.cartItems) {
      if (item.courseName === course.courseName) {
        this.toastr.error('Course already exists in your cart!');
        return;
      }
    }
    this.cartItems.push(course);
    this.stateService.cartItems.next(this.cartItems);
    this.toastr.success('Course added to cart!');
    this.onRemoveWishlistedItem(course);
  }
}
