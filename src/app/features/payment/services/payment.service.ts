import { inject, Injectable } from "@angular/core";
import { BaseHttp } from "../../../core/services/utilities/base-http.service";
import { HttpParams } from "@angular/common/http";
import { environment } from "../../../environments/env";
import { Router } from "@angular/router";
import { CartService } from "../../cart/services/cart.service";

export interface Session {
  url: string;
  success_url: string;
  cancel_url: string;
}

export interface OnlinePaymentResponse {
  status: string;
  session: Session;
}


@Injectable({
  providedIn: 'root'
})
export class PaymentService extends BaseHttp {
  private readonly router = inject(Router)
  private readonly cartService = inject(CartService)

  cashPayment(userDetails:{}, cartId:string) {
    this.http.post(`${'https://ecommerce.routemisr.com/api/v1/orders/'}/${cartId}`, {
      shippingAddress: userDetails
    }).subscribe({
      next: response => {
        console.log(response);
        this.router.navigateByUrl('/allorders')
        this.cartService.numOfCartItems.next(0);
      }
    })
  }

  onlinePayment(userDetails:{}, cartId:string) {

    const param = new HttpParams().append('url',environment.appUrl);

    this.http.post<OnlinePaymentResponse>
    (`${'https://ecommerce.routemisr.com/api/v1/orders/checkout-session'}/${cartId}`,
       {
      shippingAddress: userDetails
    },
    {
        params:param,
    }
  ).subscribe({
      next: response => {
        console.log(response);
        window.location.assign(response.session.url)
        
      }
    })
  } 



}
