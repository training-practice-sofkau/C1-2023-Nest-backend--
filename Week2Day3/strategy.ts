interface Strategy {
  calculate(a: number, b: number): number;
}

class AdditionStrategy implements Strategy {
  calculate(a: number, b: number): number {
    return a + b;
  }
}

class SubtractionStrategy implements Strategy {
  calculate(a: number, b: number): number {
    return a - b;
  }
}

class Context {
  private strategy: Strategy;

  constructor(strategy: Strategy) {
    this.strategy = strategy;
  }

  setStrategy(strategy: Strategy) {
    this.strategy = strategy;
  }

  calculate(a: number, b: number): number {
    return this.strategy.calculate(a, b);
  }
}

const context = new Context(new AdditionStrategy());
console.log(context.calculate(5, 3)); // 8

context.setStrategy(new SubtractionStrategy());
console.log(context.calculate(5, 3)); // 2
