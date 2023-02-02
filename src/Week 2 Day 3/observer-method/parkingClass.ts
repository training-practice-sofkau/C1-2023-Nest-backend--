import { Observable } from "./observableInterface";
import { Observer } from "./observerInterface";

export class Parking implements Observable {
    private spaces: Observer[] = []
    add(clients: Observer): string {
        this.spaces.push(clients)
        return "Se ha ocupado un espacio en el parqueadero"
    }
    remove(clients: Observer): string {
        this.spaces.splice(0, 1)
        return "Se ha desocupado un espacio en el parqueadero"
    }
    spacesParkint(){
        if(this.spaces.length===20){
            return "Ya no quedan espacios en el parqueadero"
        }
        if(this.spaces.length<20){
            const freeSpaces= 20-this.spaces.length
            return "Quedan "+freeSpaces+" espacios libres para nuevos vehiculos."
        }
    }
    sendData() {
        for(let clients of this.spaces){
            clients.readData()
        }
    }

}