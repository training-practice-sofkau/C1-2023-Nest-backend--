import { DogBase } from './bases/dog.base';

export class Dog extends DogBase {
  a: string;
  walk(): string {
    this.a = 'Para movilizarse el perro camina y luego, ';
    console.log(this.a);
    return this.a;
  }
  run(): string {
    this.a = 'tambien suele correr cuando esta muy feliz.';
    console.log(this.a);
    return this.a;
  }
  sound(): string {
    this.a = 'Para comunicarse el perro emite un sonido de Woof y ';
    console.log(this.a);
    return this.a;
  }
  action(): string {
    this.a = 'luego jadea sacando su lengua';
    console.log(this.a);
    return this.a;
  }
}
