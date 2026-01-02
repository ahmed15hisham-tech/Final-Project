import { Component, inject, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../features/auth/services/auth.service';
import { CartService } from '../../../features/cart/services/cart.service';
import { AsyncPipe } from '@angular/common';
import { WishListService } from '../../../features/wishList/services/wish-list.service';
@Component({
  selector: 'app-navbar',
  imports: [RouterLink,RouterLinkActive,AsyncPipe],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  private readonly authService = inject(AuthService)
  public readonly cartService = inject(CartService)
  public readonly wishListService = inject(WishListService)

  
   @Input() isLogin = false; 
   isMobileMenuOpen = false;

    toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
  closeMobileMenu() {
  this.isMobileMenuOpen = false;
}

  logout() {
    this.authService.logout();
  }
  ngOnInit(): void {
    this.cartService.getCart();
    this.wishListService.getWishList();
  } 



}
