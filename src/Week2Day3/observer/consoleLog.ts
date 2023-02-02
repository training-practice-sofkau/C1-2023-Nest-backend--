import { Observable } from './observable';
import { Observer } from './observer';

export class ConsoleLog implements Observer {
  private observable: Observable;
  constructor(observable: Observable) {
    this.observable = observable;
  }
  update(m: string): void {
    console.log(m);
  }
}
