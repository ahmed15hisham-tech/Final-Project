import { Injectable } from '@angular/core';
import { BaseHttp } from '../../../../core/services/utilities/base-http.service';
import { allProducts, IAllProductsResponse } from '../../../home/interfaces/IAllProductsResponse';

@Injectable({
  providedIn: 'root',
})
export class ProductsService  extends BaseHttp{

 allProducts!:allProducts[];
 protectedDetails!:allProducts;
 totalProducts = 0;


  getAllProducts(page=1,limit=8):void{
    this.http
    .get<IAllProductsResponse>('https://ecommerce.routemisr.com/api/v1/products'+`?page=${page}&limit=${limit}`)
    .subscribe(response => {
      console.log(response);
      this.allProducts = response.data;
     this.totalProducts= response.results
      
    })
  }

  getAllProductsById(productId:string){
    return this.http.get<{data:allProducts}>('https://ecommerce.routemisr.com/api/v1/products/'+`${productId}`)
    .subscribe({
   next:(response) =>{
      this.protectedDetails = response.data;
   }
    });
    }
  }
