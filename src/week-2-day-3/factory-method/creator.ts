import { Vehicle } from "./vehicleInterface";

export class Creator implements Vehicle{
    numberWheels(wheels: number): number {
        throw new Error("Method not implemented.");
    }
    typeMotor(typeMotos: string): string {
        throw new Error("Method not implemented.");
    }
    numberDoors(doors: number): number {
        throw new Error("Method not implemented.");
    }
    maxVel(velKmH: number): number {
        throw new Error("Method not implemented.");
    }
    passengerCapacity(capacity: number): number {
        throw new Error("Method not implemented.");
    }
    land(land: string): string {
        throw new Error("Method not implemented.");
    }
}