"use strict";
exports.__esModule = true;
exports.Secutiry = void 0;
var Secutiry = /** @class */ (function () {
    function Secutiry(observable) {
        this.observable = observable;
    }
    Secutiry.prototype.readData = function () {
        var spacesFree = this.observable.spacesParkint();
        console.log(spacesFree);
    };
    return Secutiry;
}());
exports.Secutiry = Secutiry;
