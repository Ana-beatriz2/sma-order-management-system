import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { NgZone } from '@angular/core';
import { SocketService } from '../../services/socket.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { OrdersChangedService } from '../../services/orders-changed.service';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatToolbarModule, MatButtonModule, MatIconModule],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit, OnDestroy {
  orders: any[] = [];
  changedOrdersId: any[] = [];
  private ordersTopic = 'receiveOrders';
  private subscription!: Subscription;

  constructor(
    private socketService: SocketService,
    private ngZone: NgZone,
    private ordersChangedService: OrdersChangedService
  ) {
  }

  ngOnInit(): void {
    this.subscription = this.socketService.on(this.ordersTopic).subscribe((data) => {
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

  changeStatus(order: any, status: string): void {
    const orderToChangeStatusindex = this.orders.findIndex(arrayOrder => arrayOrder.id === order.id);
    this.orders[orderToChangeStatusindex].status = status;

    if (status === 'Finished') {
      const [finishedOrder] = this.orders.splice(orderToChangeStatusindex, 1);
      this.orders.push(finishedOrder);
    }

    this.ordersChangedService.sendOrderWithChangedStatus(order);
  }
}
