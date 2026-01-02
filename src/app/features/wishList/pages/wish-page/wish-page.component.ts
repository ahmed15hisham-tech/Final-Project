import { Component, inject, OnInit } from '@angular/core';
import { WishListService } from '../../services/wish-list.service';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../cart/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-wish-page',
  imports: [RouterLink,],
  templateUrl: './wish-page.component.html',
  styleUrl: './wish-page.component.css',
})
export class WishPageComponent implements OnInit {
  
  public readonly  wishListService = inject(WishListService)
  public readonly  cartService = inject(CartService)
   public readonly toastrService = inject(ToastrService);

  
addToCart(productId: string): void {
  this.cartService.addToCart(productId).subscribe({
    next: () => {
      this.toastrService.success('Product Added to Cart');
      this.cartService.getCart(); 
    }
  
  });
}

  ngOnInit(): void {
      this.getWishList();
      

  }

  getWishList(){
    this.wishListService.getWishList();

  }

  deleteW(productId:string):void{
    this.wishListService.deleteToWishList(productId)
  }
 
}

