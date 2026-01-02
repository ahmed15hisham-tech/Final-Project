import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { allProducts, IAllProductsResponse } from '../../interfaces/IAllProductsResponse';
import { CardProductsComponent } from "../../../products/components/card-products/card-products.component";
import { SectionHeaderComponent } from "../../../../shared/components/section-header/section-header.component";
import { LodingSpinnerComponent } from "../../../../shared/components/loding-spinner/loding-spinner.component";
import { ProductsService } from '../../../products/pages/services/products.service';


@Component({
  selector: 'app-home-products',
  imports: [CardProductsComponent, SectionHeaderComponent, LodingSpinnerComponent],
  templateUrl: './home-products.component.html',
  styleUrl: './home-products.component.css',
})
export class HomeProductsComponent implements OnInit {
  public readonly productsService = inject(ProductsService)
 
 ngOnInit(): void {
     this.getAllProducts()
 }

 getAllProducts():void{
  this.productsService.getAllProducts()
 }

  }
