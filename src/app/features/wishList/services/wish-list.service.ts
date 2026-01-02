import { Injectable } from '@angular/core';
import { BaseHttp } from '../../../core/services/utilities/base-http.service';
import { STORED_KEYS } from '../../../core/constants/Stored_keys';
import { IWISHResponse, WishDET } from '../interfaces/IWISHResponse';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WishListService extends BaseHttp {

  numOfWishItems = new BehaviorSubject<number>(0);

  useWishList: WishDET[] = [];

  // ✅ NEW: Set of wishlist product IDs (for heart color)
  wishIds = new BehaviorSubject<Set<string>>(new Set());

  getWishList() {
    this.http.get<IWISHResponse>('https://ecommerce.routemisr.com/api/v1/wishlist', {
      headers: {
        token: localStorage.getItem(STORED_KEYS.USER_TOKEN)!,
      },
    })
    .subscribe((response) => {
      console.log(response);

      this.useWishList = response.data;
      this.numOfWishItems.next(response.count);

      // ✅ NEW: update ids set
      this.wishIds.next(new Set(response.data.map(p => p._id)));
    });
  }

  addToWishList(productId: string) {
    this.http.post<IWISHResponse>('https://ecommerce.routemisr.com/api/v1/wishlist', {
      productId: productId,
    }, {
      headers: {
        token: localStorage.getItem(STORED_KEYS.USER_TOKEN)!,
      },
    })
    .subscribe((response) => {
      console.log(response);
      this.getWishList();
    });
  }

  deleteToWishList(productId: string) {
    this.http.delete<IWISHResponse>(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
      headers: {
        token: localStorage.getItem(STORED_KEYS.USER_TOKEN)!,
      },
    })
    .subscribe((response) => {
      console.log(response);
      this.getWishList();
    });
  }

  clearWishList() {
    this.http.delete('https://ecommerce.routemisr.com/api/v1/wishlist', {
      headers: {
        token: localStorage.getItem(STORED_KEYS.USER_TOKEN)!,
      },
    })
    .subscribe({
      next: (response) => {
        this.useWishList = [];
        this.numOfWishItems.next(0);

        // ✅ NEW
        this.wishIds.next(new Set());
      },
    });
  }

  // ✅ NEW: check if product in wishlist
  isInWish(productId: string): boolean {
    return this.wishIds.value.has(productId);
  }

  // ✅ NEW: toggle add/remove
  toggleWish(productId: string): void {
    if (this.isInWish(productId)) {
      this.deleteToWishList(productId);
    } else {
      this.addToWishList(productId);
    }
  }
}
