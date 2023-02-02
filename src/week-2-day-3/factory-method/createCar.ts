import { Creator } from "./creator";

export class CreateCar extends Creator {
    doors: number;
    wheels: number = 4;
    velKmH: number;
    capacity: number;
    landTer: string = "tierra"

    constructor(doors: number, velKmH: number, capacity: number) {
        super();
        doors = this.doors;
        velKmH = this.velKmH;
        capacity = this.capacity
    }

    numberWheels(wheels: number): number {
        return wheels
    }
    typeMotor(typeMotor: string): string {
        return typeMotor
    }
    numberDoors(doors: number): number {
        return doors
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

    getAllInfo(): {
        land: string,
        numberWheels: number,
        numberDoors: number,
        velKmH: number,
        capacity: number
    } {
        return {
            land: this.land(this.landTer),
            numberWheels: this.numberWheels(this.wheels),
            numberDoors: this.numberDoors(this.doors),
            velKmH: this.maxVel(this.velKmH),
            capacity: this.passengerCapacity(this.capacity)
        }
    }
}