import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatToolbarModule, MatButtonModule, MatIconModule, MatInputModule, FormsModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {

  constructor(private orderService: OrderService) {
  }


  items = [
    { name: 'Produto A', quantity: 0 },
    { name: 'Produto B', quantity: 0 },
    { name: 'Produto C', quantity: 0 },
  ];
  clientName: string = '';

  increaseQuantity(item: any): void {
    item.quantity++;
  }

  decreaseQuantity(item: any): void {
    if (item.quantity > 0) {
      item.quantity--;
    }
  }

  async finalizeOrder() {
    const selectedItems = this.items.filter(item => item.quantity > 0);

    const order = {
      clientName: this.clientName,
      items: selectedItems
    }

    if (selectedItems.length === 0) {
      alert('No items selected');
      return;
    }

    if (!this.clientName) {
      alert('Please enter the client name');
      return;
    }

    await this.orderService.saveNewOrder(order);
  }
}
