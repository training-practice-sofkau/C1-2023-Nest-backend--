import { moveVehicle } from "./interface";

export class MoveCar implements moveVehicle {
    private move: number = 0;
    private km: number = 0;

    forward(): string {
        this.km = Math.floor(Math.random() * 100);
        this.move = this.move + this.km;
        return "Se movio hacia adelante " + this.km + " km";
    }
    back(): string {
        this.km = Math.floor(Math.random() * 100);
        this.move = this.move + this.km;
        return "Se movio hacia atras " + this.km + " km";
    }
    right(): string {
        this.km = Math.floor(Math.random() * 100);
        this.move = this.move + this.km;
        return "Se movio hacia derecha " + this.km + " km";
    }
    left(): string {
        this.km = Math.floor(Math.random() * 100);
        this.move = this.move + this.km;
        return "Se movio hacia izquierda " + this.km + " km";
    }
    getTotalMove() {
        return "El carro se ha movido " + this.move + " km"
    }

}