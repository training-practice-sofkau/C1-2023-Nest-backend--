interface Observador{
    update(mensaje:string):void
}
interface Suscriptor{
    suscribir(observador: Observador): void;
    deSuscribir(observador: Observador): void;
    notificacion(mensaje:string): void;
}
class SofkaU implements Suscriptor{
    actualizar(mensaje:string) {}
    suscriptores: Observador[]=[];
    correciones:string=""
    suscribir(observador: Observador): string{
        const suscriptor = this.suscriptores.includes(observador);
        if(suscriptor){
            return "ya estas suscrito"
        }
        this.suscriptores.push(observador)
        return "agregado";
    }
    deSuscribir(observador: Observador): string{
        const index = this.suscriptores.indexOf(observador)
        if(index <0){
            return "no estas suscrito, no puedes desuscribirte"
        }
        this.suscriptores.splice(index,1)
        return "Desuscrito correctamente";
    }
     notificacion(mensaje:string): void{
        for(const observador of this.suscriptores){
            observador.update(mensaje)
        }
     }
    public revisandoPullRequest(autor:string): void {
        console.log(autor+' esta revisando pulls');
        this.notificacion(this.correciones);
    }
}
class Sofkiano implements Observador{
    nombre:string;
    constructor(nombre:string){
        this.nombre = nombre
    }

    update(mensaje:string): void {
        console.log("Hola sofka soy "+this.nombre+" notificación recibida: "+mensaje+", gracias")
    }
}

const sofka = new SofkaU()

const juanColombia = new Sofkiano("Juan Perez");

const juanUruguay= new Sofkiano("Juan Jose");

sofka.suscribir(juanColombia);
sofka.suscribir(juanUruguay);

sofka.revisandoPullRequest("Julian")

sofka.deSuscribir(juanUruguay)

sofka.revisandoPullRequest("Matias")