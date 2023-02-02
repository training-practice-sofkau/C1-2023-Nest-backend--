//Abstract Class

import { FiguraGeometrica } from './FiguraGeometrica';

export abstract class Figura implements FiguraGeometrica {
  //Propiedades
  protected nombre: string;

  //Métodos
  abstract calcularArea(): void;
  abstract calcularPerimetro(): void;

  //Constructor
  constructor(i: string) {
    this.nombre = i;
  }
}
