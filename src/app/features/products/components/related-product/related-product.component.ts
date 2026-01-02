import { Component, inject } from '@angular/core';

import { SectionHeaderComponent } from "../../../../shared/components/section-header/section-header.component";
import { LodingSpinnerComponent } from "../../../../shared/components/loding-spinner/loding-spinner.component";
import { CardProductsComponent } from "../card-products/card-products.component";
import { ProductsService } from '../../pages/services/products.service';

@Component({
  selector: 'app-related-product',
  imports: [SectionHeaderComponent, LodingSpinnerComponent, CardProductsComponent],
  templateUrl: './related-product.component.html',
  styleUrl: './related-product.component.css',
})
export class RelatedProductComponent {
    public readonly productsService = inject(ProductsService)
 
 ngOnInit(): void {
     this.getAllProducts()
 }

 getAllProducts():void{
  this.productsService.getAllProducts()
 }

}
