class Contexto {
    Estrategia: Estrategia;
    constructor(estrategia: Estrategia) {
        this.Estrategia = estrategia;
    }
    public asignarEstrategia(strategy: Estrategia) {
        this.Estrategia = strategy;
    }
    public accion(): void {
        console.log('Buscando las estrategias de los training');
        const result = this.Estrategia.ejecutarPropuesta();
    }
}
interface Estrategia {
    estrategia:string
    ejecutarPropuesta():void;
}

class EstrategiaSofka implements Estrategia {
    estrategia:string=""
    public ejecutarPropuesta() {
        this.estrategia = "Poner incentivos por entregas";
    }
}

class EstrategiaColombia implements Estrategia {
        estrategia:string=""
    public ejecutarPropuesta() {
        this.estrategia = "Colombia propone mas tiempo de entrega";
    }
}

class EstrategiaUruguay implements Estrategia {
    
    estrategia:string=""
    public ejecutarPropuesta() {
        this.estrategia = "Uruguay propone hacer 2 horas mas de clase";
    }
}

const context = new Contexto(new EstrategiaSofka());
context.accion()
console.log('la estrategia actual es de sofka y proponen '+context.Estrategia.estrategia)
context.asignarEstrategia(new EstrategiaUruguay());
context.accion();
console.log('la estrategia actual es '+context.Estrategia.estrategia)
context.asignarEstrategia(new EstrategiaColombia());
context.accion();
console.log('la estrategia actual es '+context.Estrategia.estrategia)