import { MoveCar } from "./class";

const car1 = new MoveCar()
const car2 = new MoveCar()
const car3 = new MoveCar()
const car4 = new MoveCar()

car1.forward()
car2.forward()
car3.forward()
car4.forward()
car1.left()
car2.left()
car3.left()
car4.left()
car1.right()
car2.right()
car3.right()
car4.right()
car1.back()
car2.back()
car3.back()
car4.back()

console.log("Carro1 :"+car1.getTotalMove())
console.log("Carro2 :"+car1.getTotalMove())
console.log("Carro3 :"+car1.getTotalMove())
console.log("Carro4 :"+car1.getTotalMove())

