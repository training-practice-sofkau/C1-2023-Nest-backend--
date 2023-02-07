//Class
import { Figura } from './Figura';

export class Circulo extends Figura {
  //Atributos
  radio: number;

  //Métodos
  calcularArea(): number {
    const area = Math.PI * (this.radio * this.radio);
    console.log(`El área de ${this.nombre} es ${area}`);
    return area;
  }

  calcularPerimetro(): number {
    const perimetro = 2 * Math.PI * this.radio;
    console.log(`El perímetro de ${this.nombre} es ${perimetro}`);
    return perimetro;
  }

  //Constructor
  constructor(nombre: string, radio: number) {
    super(nombre);
    this.radio = radio;
  }
}
