import { Component, inject, OnInit } from '@angular/core';
import { NavbarComponent } from "../../../../core/components/navbar/navbar.component";
import { CardProductsComponent } from '../../components/card-products/card-products.component';
import { SectionHeaderComponent } from "../../../../shared/components/section-header/section-header.component";
import { LodingSpinnerComponent } from "../../../../shared/components/loding-spinner/loding-spinner.component";
import {NgxPaginationModule} from 'ngx-pagination';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { ProductsService } from '../services/products.service';
import { FormsModule } from '@angular/forms';
import { textUpperCasePipe } from '../../../../shared/pipes/text-Uppercase.pipe';
import { FilterPipe } from '../../../../shared/pipes/filter-product.pipe';

@Component({
  selector: 'app-products-page',
  imports: [NavbarComponent,
    CardProductsComponent,
    SectionHeaderComponent,
    LodingSpinnerComponent,
    NgxPaginationModule,
    FormsModule,
    textUpperCasePipe,
    FilterPipe
  ],

  templateUrl: './products-page.component.html',
  styleUrl: './products-page.component.css',
})
export class ProductsPageComponent  implements OnInit{

  public readonly productsService = inject(ProductsService)
  public readonly router = inject(Router)
  public readonly viewportScroller = inject(ViewportScroller)
  public readonly activatedRoute = inject(ActivatedRoute)
 



  page = 1
  limit = 20
  searchText = ''

  constructor(){
   const page =+this.activatedRoute.snapshot.queryParamMap.get('page')!;
   this.page = page ? +page : 1;  
  }
 
 ngOnInit(): void {
     this.getAllProducts()
 }

 getAllProducts():void{
  this.productsService.getAllProducts(this.page,this.limit)
 }


 pagechanged($event:number):void{
  this.page = $event
  this.getAllProducts()
  this.viewportScroller.scrollToPosition([0,0],{
    behavior: 'smooth'
  })
  this.router.navigate([], {
    queryParams:{
      page: this.page
    }
  })
  
}
}
