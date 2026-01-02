import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BaseHttp } from '../../../core/services/utilities/base-http.service';
import { isPlatformBrowser } from '@angular/common';
import { STORED_KEYS } from '../../../core/constants/Stored_keys';
import { IAllOrdersResponse } from '../interfaces/IAllOrdersResponse';

@Injectable({
  providedIn: 'root',
})
export class OrdersService extends BaseHttp {
private readonly platformId = inject(PLATFORM_ID);

userOrders!: IAllOrdersResponse[];

getOrders() {
  if (isPlatformBrowser(this.platformId)) {
    const userId = localStorage.getItem(STORED_KEYS.USER_ID);

    this.http.get<IAllOrdersResponse[]>(`${'https://ecommerce.routemisr.com/api/v1/orders/user'}/${userId}`).subscribe({
      next: (response) => {
        console.log(response);
        this.userOrders = response;
      },
    });
  }
}

}
