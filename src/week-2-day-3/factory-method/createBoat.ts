import { Creator } from "./creator";

export class CreateBoat extends Creator {
    velKmH: number;
    capacity: number;
    landTer: string = "Water";
    oars: boolean;

    constructor(oars: boolean, velKmH: number, capacity: number) {
        super();
        oars = this.oars
        velKmH = this.velKmH;
        capacity = this.capacity
    }
    typeMotor(typeMotor: string): string {
        return typeMotor
    }
    maxVel(velKmH: number): number {
        return velKmH
    }
    passengerCapacity(capacity: number): number {
        return capacity
    }
    land(land: string): string {
        return land
    }
    oarsH(oars: boolean): boolean {
        return oars
    }

    getAllInfo(): {
        land: string,
        velKmH: number,
        capacity: number,
        oars: boolean
    } {
        return {
            land: this.land(this.landTer),
            velKmH: this.maxVel(this.velKmH),
            capacity: this.passengerCapacity(this.capacity),
            oars: this.oarsH(this.oars)
        }
    }
}