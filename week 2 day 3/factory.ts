abstract class Creador {
    public abstract tesoreria(): Pago;
    public ejecutarPago(): string {
        const product = this.tesoreria();
        return `el mismo creador procesa ${product.consignar()}`;
    }
}

class CrearTransferencia extends Creador {
    public tesoreria(): Pago {
        return new Transferencia();
    }
}

class CrearRecarga extends Creador {
    public tesoreria(): Pago {
        return new Tarjeta();
    }
}
interface Pago {
    consignar(): string;
}

class Transferencia implements Pago {
    public consignar(): string {
        return 'consignacion por transferencia';
    }
}

class Tarjeta implements Pago {
    public consignar(): string {
        return 'recarga tarjeta sodexo';
    }
}

function pagos(creator: Creador) {
    console.log(creator.ejecutarPago())
}

console.log('Se lanza con el creador 1');
pagos(new CrearTransferencia());
console.log('');

console.log('Se lanza con el creador 2');
pagos(new CrearRecarga());