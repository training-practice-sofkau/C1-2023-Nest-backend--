import { Observer } from "./observerInterface";
import { Parking } from "./parkingClass";

export class Secutiry implements Observer {
    private observable;
    constructor(observable: Parking) {
        this.observable = observable;
    }
    readData() {
        console.log(this.observable.spacesParkint)
    }

}