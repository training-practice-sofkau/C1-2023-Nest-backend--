import { Creator } from "./creator";

export class CreateMoto extends Creator {
    wheels: number = 2;
    velKmH: number;
    capacity: number = 2;
    landTer: string = "tierra";
    cylinder: number;

    constructor(velKmH: number, cylinder: number) {
        super();
        velKmH = this.velKmH;
        cylinder = this.cylinder
    }

    numberWheels(wheels: number): number {
        return wheels
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
    cylinderCap(cylinder:number):number {
        return cylinder;
    }

    getAllInfo():{
        land: string,
        numberWheels: number,
        velKmH: number,
        capacity: number,
        cylinderCapacity: number,
    } {
        return {
            land: this.land(this.landTer),
            numberWheels: this.numberWheels(this.wheels),
            velKmH: this.maxVel(this.velKmH),
            capacity: this.passengerCapacity(this.capacity),
            cylinderCapacity: this.cylinderCap(this.cylinder),
        }
    }
} 