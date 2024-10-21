import { Injectable, MessageEvent } from '@nestjs/common';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class AppService {
  notificationEvents: Record<string, Subject<any>> = {};

  getHello(): string {
    return 'Hello World!';
  }

  payloadMap: Record<number, string> = {
    10: 'DATA FROM 10',
    20: 'DATA FROM 20',
    30: 'DATA FROM 30',
    40: 'DATA FROM 40',
    50: 'DATA FROM 50',
    60: 'DATA FROM 60',
    70: 'DATA FROM 70',
    80: 'DATA FROM 80',
    90: 'DATA FROM 90',
    100: 'DATA FROM 100',
  };

  handleConnection(id: string): Observable<MessageEvent> {
    if (!this.notificationEvents[id]) {
      this.notificationEvents[id] = new Subject();
    }

    setInterval(() => {
      this.notificationEvents[id].next({
        type: id,
        data: this.payloadMap[id],
      });
    }, 5000);
    return this.notificationEvents[id].asObservable();
  }
}
