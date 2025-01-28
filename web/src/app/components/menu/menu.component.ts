import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { OrderService } from '../../services/order.service';
import { INewOrder } from '../../models/order.model';

interface Iitem {
  name: string;
  quantity: number
}

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatToolbarModule, MatButtonModule, MatIconModule, MatInputModule, FormsModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {

  constructor(private orderService: OrderService) {}

  items = [
    { name: 'Classic Burger', quantity: 0 },
    { name: 'Cheeseburger', quantity: 0 },
    { name: 'French Fries', quantity: 0 },
    { name: 'Chicken Sandwich', quantity: 0 },
    { name: 'Chicken Croquette', quantity: 0 },
    { name: 'Soda', quantity: 0 },
    { name: 'Fresh Juice', quantity: 0 },
    { name: 'Pepperoni Pizza', quantity: 0 },
    { name: 'Bacon Burger', quantity: 0 },
    { name: 'Meat Pastry', quantity: 0 },
    { name: 'Grilled Cheese Sandwich', quantity: 0 },
    { name: 'Chicken Wrap', quantity: 0 },
    { name: 'Hot Dog', quantity: 0 },
    { name: 'Fish and Chips', quantity: 0 },
    { name: 'Cheese Fries', quantity: 0 },
    { name: 'Veggie Burger', quantity: 0 },
    { name: 'Caesar Salad', quantity: 0 },
    { name: 'Chicken Tenders', quantity: 0 },
    { name: 'Onion Rings', quantity: 0 },
    { name: 'Milkshake', quantity: 0 }
  ];
  clientName: string = '';

  increaseQuantity(item: Iitem): void {
    item.quantity++;
  }

  decreaseQuantity(item: Iitem): void {
    if (item.quantity > 0) {
      item.quantity--;
    }
  }

  async finalizeOrder() {
    const selectedItems = this.items.filter(item => item.quantity > 0);

    const order: INewOrder = {
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

    alert('Order finalized');
    await this.orderService.saveNewOrder(order);
  }
}
