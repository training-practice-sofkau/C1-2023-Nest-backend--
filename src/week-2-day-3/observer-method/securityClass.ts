import { Observer } from "./observerInterface";
import { Parking } from "./parkingClass";

export class Secutiry implements Observer {
    private observable;
    constructor(observable: Parking) {
        this.observable = observable;
    }
    readData() {
        const spacesFree = this.observable.spacesParkint()
        console.log(spacesFree)
    }

}