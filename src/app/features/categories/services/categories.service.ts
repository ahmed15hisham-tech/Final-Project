import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IAllCatgoriseResponse } from '../interfaces/IAllCatgoriseResponse';
import { BaseHttp } from '../../../core/services/utilities/base-http.service';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService extends BaseHttp{



  allCategories!:IAllCatgoriseResponse[]

  getAllCategories() {
    return this.http.get<IAllCatgoriseResponse>('https://ecommerce.routemisr.com/api/v1/categories')
    .subscribe(response=>{this.allCategories=response.data});
  }}
