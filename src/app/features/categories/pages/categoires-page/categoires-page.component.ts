import { Component, inject, OnInit } from '@angular/core';
import { NavbarComponent } from "../../../../core/components/navbar/navbar.component";
import { CategoriesService } from '../../services/categories.service';
import { SectionHeaderComponent } from "../../../../shared/components/section-header/section-header.component";
import { LodingSpinnerComponent } from "../../../../shared/components/loding-spinner/loding-spinner.component";

@Component({
  selector: 'app-categoires-page',
  imports: [NavbarComponent, SectionHeaderComponent, LodingSpinnerComponent],
  templateUrl: './categoires-page.component.html',
  styleUrl: './categoires-page.component.css',
})
export class CategoiresPageComponent implements OnInit {

  public readonly categoriesService = inject(CategoriesService)

  ngOnInit(): void {
    this.getAllCategories()
  }
  getAllCategories(): void {
    this.categoriesService.getAllCategories()
}
}