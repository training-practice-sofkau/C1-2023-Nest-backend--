import { IComunication, IMove } from '../interfaces';

export abstract class DogBase implements IMove, IComunication {
  move(): string {
    return this.walk() + this.run();
  }
  say(): string {
    return this.sound() + this.action();
  }

  abstract walk(): string;
  abstract run(): string;
  abstract sound(): string;
  abstract action(): string;
}
