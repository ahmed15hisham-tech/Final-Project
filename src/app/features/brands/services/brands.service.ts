import { Injectable } from '@angular/core';
import { BaseHttp } from '../../../core/services/utilities/base-http.service';
import { Brands, IAllBrandsResponse } from '../interfaces/IAllBrandsResponse';

@Injectable({
  providedIn: 'root',
})
export class BrandsService extends BaseHttp {
  allBrands!:Brands[]


  getAllBrands() {
  this.http.get<IAllBrandsResponse>('https://ecommerce.routemisr.com/api/v1/brands').subscribe({
    next: (response) => {
   this.allBrands = response.data
    }
  })

}}
