import { Parking } from "./parkingClass";
import { Secutiry } from "./securityClass";

let parking = new Parking();
let client1 = new Secutiry(parking);
let client2 = new Secutiry(parking);
let client3 = new Secutiry(parking);
let client4 = new Secutiry(parking);
let client5 = new Secutiry(parking);

let result = parking.add(client1)
console.log(result)
result = parking.add(client2)
console.log(result)
result = parking.remove(client1)
console.log(result)
result = parking.add(client1)
console.log(result)