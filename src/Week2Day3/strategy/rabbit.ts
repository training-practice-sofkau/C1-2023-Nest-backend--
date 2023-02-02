import { RabbitBase } from './bases';

export class Rabbit extends RabbitBase {
  a: string;
  jump(): string {
    this.a = 'Para movilizarse el conejo salta en la mayoria de los casos,';
    console.log(this.a);
    return this.a;
  }
  walk(): string {
    this.a = ' Pero también camina, lo hace poniendo sus patitas a delante.';
    console.log(this.a);
    return this.a;
  }
  sound(): string {
    this.a = 'Desconozco el sonido que hacen los conejos!';
    console.log(this.a);
    return this.a;
  }
}
