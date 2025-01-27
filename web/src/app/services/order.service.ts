import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private baseUrl = 'http://localhost:3000';

  async sendOrderWithChangedStatus(order: any): Promise<any> {
    const response = await axios.post(`${this.baseUrl}/changed-orders`, order);
    return response.data;
  }

  async saveNewOrder(order: any): Promise<void> {
    await axios.post(`${this.baseUrl}/new-order`, order);
  }
}
