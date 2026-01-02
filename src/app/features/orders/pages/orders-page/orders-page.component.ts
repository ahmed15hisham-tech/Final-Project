import { Component, inject, OnInit } from '@angular/core';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-orders-page',
  imports: [],
  templateUrl: './orders-page.component.html',
  styleUrl: './orders-page.component.css',
})
export class OrdersPageComponent implements OnInit {

  public readonly ordersService = inject(OrdersService);

  ngOnInit(): void {
      
    this.getOrders();

  }


  getOrders(): void {
    this.ordersService.getOrders()
  }
}
