import { Body, Controller, Get, Post } from '@nestjs/common';
import { ConsoleLog } from './consoleLog';
import { Observable } from './observable';
import { Observer } from './observer';

@Controller('calculator')
export class Calculator implements Observable {
  private observers: Observer[] = [];
  subscribe(observer: Observer) {
    this.observers.push(observer);
  }

  unSubscribe(observer: Observer) {
    const index = this.observers.findIndex((e) => e === observer);
    this.observers.splice(index, 1);
  }

  notify(action: string): void {
    for (const o of this.observers) {
      o.update(action);
    }
  }

  @Get('subscribe')
  subscribeRq(): void {
    const a = new ConsoleLog(this);
    this.subscribe(a);
  }

  @Get('unsubscribe')
  unsubscribeRq(): void {
    const a = new ConsoleLog(this);
    this.unSubscribe(a);
  }

  @Post('sum')
  sum(@Body('numbers') numbers: number[]): number {
    const initialValue = 0;
    const total = numbers?.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      initialValue,
    );
    this.notify(
      `Se realizo la suma de ${numbers}, que dio como resultado ${total}`,
    );
    return total;
  }

  @Post('multiply')
  multiply(@Body('numbers') numbers: number[]): number {
    const total = numbers?.reduce((p, c) => p * c);
    this.notify(
      `Se realizo la multiplicacion de ${numbers}, que dio como resultado ${total}`,
    );
    return total;
  }
}
