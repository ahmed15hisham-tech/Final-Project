import { Component, inject, Input, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { allProducts } from '../../../home/interfaces/IAllProductsResponse';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../cart/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { WishListService } from '../../../wishList/services/wish-list.service';

@Component({
  selector: 'app-card-products',
  imports: [RouterLink],
  templateUrl: './card-products.component.html',
  styleUrl: './card-products.component.css',
})
export class CardProductsComponent implements OnInit, OnDestroy {
  public readonly cartsService = inject(CartService);
  public readonly toastrService = inject(ToastrService);
  public readonly ngxSpinnerService = inject(NgxSpinnerService);
  public readonly wishListService = inject(WishListService);

  isLoading = false;

  @Input({ required: true }) prod!: allProducts;

  
  isWished = false;

  
  private sub?: Subscription;

  ngOnInit(): void {
  
    this.wishListService.getWishList();

    
    this.sub = this.wishListService.wishIds.subscribe((ids) => {
      this.isWished = ids.has(this.prod?._id);
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  toggleWish(productId: string): void {
    const wasInWish = this.isWished;

    this.wishListService.toggleWish(productId);

    
    this.isWished = !wasInWish;

    if (wasInWish) {
      this.toastrService.info('Removed from WishList');
    } else {
      this.toastrService.success('Added to WishList');
    }
  }

  addToCart(productId: string): void {
    this.isLoading = true;
    this.ngxSpinnerService.show();

    this.cartsService.addToCart(productId).subscribe({
      next: (response) => {
        this.cartsService.numOfCartItems.next(response.numOfCartItems);
        this.isLoading = false;
        this.toastrService.success('Product Added Success');
        this.ngxSpinnerService.hide();
      },
      error: (_error: HttpErrorResponse) => {
        this.toastrService.error('Failed');
        this.ngxSpinnerService.hide();
        this.isLoading = false;
      },
    });
  }
}
