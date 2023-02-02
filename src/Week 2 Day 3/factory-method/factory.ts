import { CreateBoat } from "./createBoat";
import { CreateCar } from "./createCar";
import { CreateMoto } from "./createMoto";
import { vehicleType } from "./vehiclesTypes";

export class Factory {
    createVehicle(vehicleType: string) {
        vehicleType = vehicleType.toLowerCase()
        switch (vehicleType) {
            case "carro":
                const newCar = new CreateCar(4, 200, 5);
                return newCar.getAllInfo()
            case "moto":
                const newMoto = new CreateMoto(220, 200);
                return newMoto.getAllInfo()
            case "barco":
                const newBoat = new CreateBoat(false, 150, 10)
                return newBoat.getAllInfo()
            default:
                return "Las opciones validas son : carro, moto o barco"
        }
    }
}