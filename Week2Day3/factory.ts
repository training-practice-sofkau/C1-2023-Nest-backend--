/**
 * se utiliza para crear objetos en una clase abstracta o interfaz sin especificar la clase concreta que se creará. 
 */

interface lunch {
  cook(): void;
}

class LunchOfTheDay implements lunch {
  cook() {
    console.log('Cocinando almuerzo del dia');
  }
}

class ExecutiveLunch implements lunch {
  cook() {
    console.log('Cocinando un almuerzo ejecutivo');
  }
}

abstract class ShapeFactory {
  static getShape(type: string): lunch {
    switch (type) {
      case 'OFTHEDAY':
        return new LunchOfTheDay();
      case 'EXECUTIVE':
        return new ExecutiveLunch();
      default:
        throw new Error('Almuerzo no valido');
    }
  }
}

const ofTheDay = ShapeFactory.getShape('OFTHEDAY');
ofTheDay.cook();

const executive = ShapeFactory.getShape('EXECUTIVE');
executive.cook();
