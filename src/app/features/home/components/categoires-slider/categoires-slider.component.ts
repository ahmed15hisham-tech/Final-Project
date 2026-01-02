import { Component, inject } from '@angular/core';
import { CategoriesService } from '../../../categories/services/categories.service';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-categoires-slider',
  imports: [CarouselModule],
  templateUrl: './categoires-slider.component.html',
  styleUrl: './categoires-slider.component.css',
})
export class CategoiresSliderComponent {
    public readonly categoriesService = inject(CategoriesService)

  ngOnInit(): void {
    this.getAllCategories()
  }
  getAllCategories(): void {
    this.categoriesService.getAllCategories()
}

customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    autoplay: true,
    autoplaySpeed: 1490,
    autoplayTimeout: 1500,
    slideTransition: 'linear',
    
    navText: ['<i class=" text-black fas fa-arrow-left"></i>',
       '<i class=" text-black fas fa-arrow-right"></i>'],
    responsive: {
      0: {
        items: 2
      },
      400: {
        items: 3
      },
      740: {
        items: 6
      },
      940: {
        items: 8
      }
    },
    nav: true
  }

}
