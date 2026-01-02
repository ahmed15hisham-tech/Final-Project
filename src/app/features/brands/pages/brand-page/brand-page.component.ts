import { Component, inject, OnInit } from '@angular/core';
import { NavbarComponent } from "../../../../core/components/navbar/navbar.component";
import { BrandsService } from '../../services/brands.service';
import { LodingSpinnerComponent } from "../../../../shared/components/loding-spinner/loding-spinner.component";
import { SectionHeaderComponent } from "../../../../shared/components/section-header/section-header.component";

@Component({
  selector: 'app-brand-page',
  imports: [NavbarComponent, LodingSpinnerComponent, SectionHeaderComponent],
  templateUrl: './brand-page.component.html',
  styleUrl: './brand-page.component.css',
})
export class BrandPageComponent  implements OnInit{
public readonly brandsService = inject(BrandsService)


ngOnInit(): void {
    this.getAllBrands()
}
getAllBrands(){
  this.brandsService.getAllBrands()
}
}
