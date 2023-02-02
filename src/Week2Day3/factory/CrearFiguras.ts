//Class

import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { Circulo } from './Circulo';
import { Cuadrado } from './Cuadrado';
import { Figura } from './Figura';

@Controller('factory')
export class CrearFiguras {
  @Post('circulo')
  circulo(@Body('figura') figura: { nombre: string; valor: number }) {
    const circulo = this.crear(figura?.nombre, 'Circulo', figura.valor);
    return {
      figura: 'circulo',
      propiedades: {
        area: circulo.calcularArea(),
        perimetro: circulo.calcularPerimetro(),
      },
    };
  }

  @Post('cuadrado')
  cuadrado(@Body('figura') figura: { nombre: string; valor: number }) {
    const cuadrado = this.crear(figura?.nombre, 'Cuadrado', figura.valor);
    return {
      figura: 'cuadrado',
      propiedades: {
        area: cuadrado?.calcularArea(),
        perimetro: cuadrado?.calcularPerimetro(),
      },
    };
  }

  private crear(
    nombre: string,
    tipo: 'Circulo' | 'Cuadrado',
    valor: number,
  ): Figura {
    if (tipo == 'Circulo') {
      return new Circulo(nombre, valor);
    }
    if (tipo == 'Cuadrado') {
      return new Cuadrado(nombre, valor);
    }
    throw new BadRequestException('No es un tipo de figura');
  }
}
