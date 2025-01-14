import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { NgZone } from '@angular/core';
import { SocketService } from '../../services/socket.service';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit, OnDestroy {
  orders: any[] = [];
  private ordersTopic = 'receiveOrders';
  private subscription!: Subscription;

  constructor(private socketService: SocketService, private ngZone: NgZone) {

  }

  ngOnInit(): void {
      this.subscription = this.socketService.on(this.ordersTopic).subscribe((data) => {
        console.log('New order received:', data);
        this.ngZone.run(() => {
          this.orders = data;
        });
      });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.socketService.disconnect();
  }

  processOrder(order: any): void {
    console.log('Processing order:', order);
  }
}
