import { Inject, Injectable, PLATFORM_ID, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket!: Socket;
  private isBrowser = false;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private ngZone: NgZone
 ) {
  this.isBrowser = isPlatformBrowser(this.platformId)

  if (this.isBrowser) {
    this.socket = io('http://localhost:3000');
  }
}

  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
    }
  }

  on(event: string): Observable<any> {
    return new Observable((observer) => {
      if (this.socket) {
        this.socket.on(event, (data) => {
          this.ngZone.run(() => {
            observer.next(data);
          });
        });

        return () => {
          console.log('Event disconnected:', event);
          this.socket.off(event);
        };
      } else {
        observer.error('Socket is not initialized.');
        return;
      }
    });
  }

  emit(event: string, data: any): void {
    if (this.socket) {
      console.log('Emitting event:', event, 'with data:', data);
      this.socket.emit(event, data);
    } else {
      console.error('Socket is not initialized.');
    }
  }
}
