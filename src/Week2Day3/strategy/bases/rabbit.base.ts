import { IComunication, IMove } from '../interfaces';

export abstract class RabbitBase implements IMove, IComunication {
  say(): string {
    return this.sound();
  }
  move(): string {
    return this.jump() + this.walk();
  }

  abstract jump(): string;
  abstract walk(): string;
  abstract sound(): string;
}
