"use strict";
exports.__esModule = true;
exports.Parking = void 0;
var Parking = /** @class */ (function () {
    function Parking() {
        this.spaces = [];
    }
    Parking.prototype.add = function (clients) {
        this.spaces.push(clients);
        this.sendData();
        return "Se ha ocupado un espacio en el parqueadero";
    };
    Parking.prototype.remove = function (clients) {
        this.spaces.splice(0, 1);
        this.sendData();
        return "Se ha desocupado un espacio en el parqueadero";
    };
    Parking.prototype.spacesParkint = function () {
        if (this.spaces.length === 20) {
            return "Ya no quedan espacios en el parqueadero";
        }
        if (this.spaces.length < 20) {
            var freeSpaces = 20 - this.spaces.length;
            return "Quedan " + freeSpaces + " espacios libres para nuevos vehiculos.";
        }
    };
    Parking.prototype.sendData = function () {
        for (var _i = 0, _a = this.spaces; _i < _a.length; _i++) {
            var clients = _a[_i];
            clients.readData();
        }
    };
    return Parking;
}());
exports.Parking = Parking;
