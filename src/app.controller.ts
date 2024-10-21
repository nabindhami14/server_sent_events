import {
  Controller,
  Get,
  MessageEvent,
  NotFoundException,
  Param,
  Sse,
} from '@nestjs/common';
import { interval, map, Observable, Subject } from 'rxjs';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  notificationEvents: Record<string, Subject<any>> = {};

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

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Sse('stocks/stream')
  sse(): Observable<MessageEvent> {
    return interval(1000).pipe(
      map((_) => ({ type: 'live-stocks', data: { hello: 'world' } })),
    );
  }

  @Sse('stocks/stream/:id')
  stocksDetails(
    @Param() { id }: Record<string, string>,
  ): Observable<MessageEvent> {
    if (!this.payloadMap[id]) {
      throw new NotFoundException();
    }

    // no need to make this async or return a Promise. Observables are handled just fine as they are
    return interval(5000).pipe(
      map((_) => ({
        type: `${id}: DETAILS`,
        data: { mesage: this.payloadMap[id], time: new Date() },
      })),
    );
  }
}
