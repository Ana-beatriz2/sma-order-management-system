import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class OrdersChangedService {
  private baseUrl = 'http://localhost:3000';

  async sendOrderWithChangedStatus(order: any): Promise<any> {
    const response = await axios.post(`${this.baseUrl}/changed-orders`, order);
    return response.data;
  }
}
