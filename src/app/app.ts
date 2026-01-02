import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FlowbiteService } from './core/flowbite/flowbite.service';
import { FooterComponent } from "./core/components/footer/footer.component";
import { NavbarComponent } from "./core/components/navbar/navbar.component";
import { NgxSpinnerModule, NgxSpinnerService } from "ngx-spinner";


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FooterComponent, NavbarComponent,NgxSpinnerModule,],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  
  private readonly flowbiteService = inject(FlowbiteService)
  private readonly ngxSpinnerService = inject(NgxSpinnerService)
  
  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {
     flowbite.initFlowbite();
    });
    this.ngxSpinnerService.show()

    setTimeout(() => {
      this.ngxSpinnerService.hide()

    }, 2000);
}
}