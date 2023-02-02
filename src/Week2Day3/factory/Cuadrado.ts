//Class
import { Figura } from './Figura';

export class Cuadrado extends Figura {
  //Atributos
  lado: number;

  //Métodos
  calcularArea(): number {
    const area = this.lado * this.lado;
    console.log(`El área de ${this.nombre} es ${area}`);
    return area;
  }

  calcularPerimetro(): number {
    const perimetro = this.lado * 4;
    console.log(`El perímetro de ${this.nombre} es ${perimetro}`);
    return perimetro;
  }

  //Constructor
  constructor(nombre: string, lado: number) {
    super(nombre);
    this.lado = lado;
  }
}
