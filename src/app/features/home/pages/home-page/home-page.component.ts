import { Component } from '@angular/core';
import { MainSliderComponent } from '../../components/main-slider/main-slider.component';
import { HomeProductsComponent } from '../../components/home-products/home-products.component';
import { CategoiresSliderComponent } from '../../components/categoires-slider/categoires-slider.component';

@Component({
  selector: 'app-home-page',
  imports: [MainSliderComponent,HomeProductsComponent,CategoiresSliderComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent {

}
