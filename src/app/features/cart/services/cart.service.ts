import { Injectable } from '@angular/core';
import { BaseHttp } from '../../../core/services/utilities/base-http.service';
import { STORED_KEYS } from '../../../core/constants/Stored_keys';
import { CartDetails, ICartResponse } from '../interfaces/ICartResponse';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService  extends BaseHttp{
  userCart!:CartDetails;
  numOfCartItems =new BehaviorSubject<number>(0);
 
  
  getCart(){
    this.http.get<ICartResponse>('https://ecommerce.routemisr.com/api/v1/cart',{
    headers:{
      token: localStorage.getItem(STORED_KEYS.USER_TOKEN)!
  }  
}
 ).subscribe({
      next:(response)=>{
        console.log(response);
        this.userCart=response.data;
        this.numOfCartItems.next(response.numOfCartItems);
      },error:error=>{
        
      }
    })
  }


  addToCart(productId:string){
  
   return this.http.post<ICartResponse>('https://ecommerce.routemisr.com/api/v1/cart',{
      productId:productId,
    
    })
   
}

  update(count:number,productId:string){
  
    this.http.put<ICartResponse>(`${'https://ecommerce.routemisr.com/api/v1/cart'}/${productId}`,{
      count : count,
    
    }).subscribe({
      next:(response)=>{
        console.log(response);
        this.userCart=response.data;

}})}

  Delete(productId:string){
    this.http.delete<ICartResponse>(`${'https://ecommerce.routemisr.com/api/v1/cart'}/${productId}`
  
    )
    .subscribe({
      next:(response)=>{
        this.userCart=response.data;;
}})}


Clear(){
  this.http.delete('https://ecommerce.routemisr.com/api/v1/cart'
   
  ).subscribe({
    next:response=>{
      this.userCart.products = []
    }
  })
}




}




