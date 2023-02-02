import { IComunication, IMove } from './interfaces';

export class Context {
  private action: any;
  constructor(action: IMove | IComunication) {
    this.action = action;
  }

  move(): string {
    return this.action.move();
  }

  say(): string {
    return this.action.say();
  }
}
