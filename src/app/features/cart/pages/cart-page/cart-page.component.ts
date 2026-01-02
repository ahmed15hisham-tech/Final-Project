import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { LodingSpinnerComponent } from "../../../../shared/components/loding-spinner/loding-spinner.component";
import { RouterLink } from "@angular/router";
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-cart-page',
  imports: [LodingSpinnerComponent, RouterLink,CurrencyPipe],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css',
})
export class CartPageComponent implements OnInit {

  public readonly cartService = inject(CartService)

ngOnInit(): void {
  this.getCart()
    
}
getCart():void{
  this.cartService.getCart()
}

updateP(count:number,productId:string):void{
  this.cartService.update(count,productId)
}

deleteP(productId:string):void{
  this.cartService.Delete(productId)}



  Clear():void{
this.cartService.Clear();
  }


}