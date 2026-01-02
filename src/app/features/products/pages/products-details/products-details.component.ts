import { Component, inject } from '@angular/core';
import { NavbarComponent } from "../../../../core/components/navbar/navbar.component";
import { ActivatedRoute } from '@angular/router';
import { LodingSpinnerComponent } from "../../../../shared/components/loding-spinner/loding-spinner.component";
import { RelatedProductComponent } from "../../components/related-product/related-product.component";
import { ViewportScroller } from '@angular/common';
import { ProductsService } from '../services/products.service';
import { CartService } from '../../../cart/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { WishListService } from '../../../wishList/services/wish-list.service';

@Component({
  selector: 'app-products-details',
  imports: [NavbarComponent, LodingSpinnerComponent, RelatedProductComponent],
  templateUrl: './products-details.component.html',
  styleUrl: './products-details.component.css',
})
export class ProductsDetailsComponent {

  private readonly activatedRoute = inject(ActivatedRoute);
  public readonly productsService = inject(ProductsService);
  public readonly viewportScroller = inject(ViewportScroller);

  private readonly cartService = inject(CartService);
  private readonly wishListService = inject(WishListService);
  private readonly toastrService = inject(ToastrService);

  productId!: string;

  constructor() {
    this.activatedRoute.paramMap.subscribe({
      next: (params) => {
        this.productId = params.get('id')!;
        this.productById();
        this.viewportScroller.scrollToPosition([0, 0], { behavior: 'smooth' });
      }
    });
  }

  productById(): void {
    this.productsService.getAllProductsById(this.productId);
  }

  //  Add To Cart
  addToCart(productId: string): void {
    this.cartService.addToCart(productId).subscribe({
      next: () => {
        this.cartService.getCart();
        this.toastrService.success('Added to cart');
      },
      error: (error: HttpErrorResponse) => {
        if (error.status === 400) {
          this.toastrService.info('Product already in cart');
        } else {
          this.toastrService.error('Something went wrong');
        }
      }
    });
  }

  // Add To Wishlist
  addToWishlist(productId: string): void {
    this.wishListService.addToWishList(productId);
    this.toastrService.success('Added to wishlist');
  }

}
