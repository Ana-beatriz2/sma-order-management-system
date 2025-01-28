import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { NgZone } from '@angular/core';
import { SocketService } from '../../services/socket.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { isPlatformBrowser } from '@angular/common';
import { OrderService } from '../../services/order.service';

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
    private orderService: OrderService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const savedOrders = sessionStorage.getItem('orders');
      if (savedOrders) {
        this.orders = JSON.parse(savedOrders);
      }
    }

    this.subscription = this.socketService.on(this.ordersTopic).subscribe((data) => {
      this.ngZone.run(() => {
        this.orders = data;
        this.updateSessionStorage();
      });
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.socketService.disconnect();
  }

  async changeStatus(order: any, status: string): Promise<void> {
    const orderToChangeStatusindex = this.orders.findIndex(arrayOrder => arrayOrder.id === order.id);
    this.orders[orderToChangeStatusindex].status = status;

    if (status === 'Finished') {
      const [finishedOrder] = this.orders.splice(orderToChangeStatusindex, 1);
      this.orders.push(finishedOrder);
    }

    this.updateSessionStorage();
    await this.orderService.sendOrderWithChangedStatus(order);
  }

  private updateSessionStorage(): void {
    sessionStorage.setItem('orders', JSON.stringify(this.orders));
  }
}
