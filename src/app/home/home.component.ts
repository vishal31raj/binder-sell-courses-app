import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  mainNavItems = [
    {
      id: 1,
      name: 'Courses',
      path: 'courses',
      isActive: false,
    },
    {
      id: 2,
      name: 'Wishlist',
      path: 'wishlist',
      isActive: false,
    },
    {
      id: 3,
      name: 'Cart',
      path: 'cart',
      isActive: false,
    },
    {
      id: 4,
      name: 'Profile',
      path: 'profile',
      isActive: false,
    },
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.setCurrentPath();
  }

  onNavLinkClick(navItemId: number) {
    for (let item of this.mainNavItems) {
      if (item.id === navItemId) {
        item.isActive = true;
        this.router.navigate(['/home/' + item.path]);
      } else {
        item.isActive = false;
      }
    }
  }

  setCurrentPath() {
    const activeNavItem = this.mainNavItems.find(
      (item) => item.path === this.router.url.split('/')[2]
    );
    this.onNavLinkClick(activeNavItem!.id);
  }
}
