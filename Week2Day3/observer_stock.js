// Implementación de la clase Customer que implementa la interfaz Observer
var Customer = /** @class */ (function () {
    function Customer(name) {
        this.name = name;
    }
    // Método update para manejar la notificación
    Customer.prototype.update = function (product) {
        console.log(this.name + " received notification: " + product.name + " is now in stock and has " + product.stock + " units available.");
    };
    return Customer;
}());
// Implementación de la clase ProductImpl que implementa la interfaz Product
var ProductImpl = /** @class */ (function () {
    function ProductImpl(name, stock) {
        // Lista de observadores
        this.observers = [];
        this.name = name;
        this.stock = stock;
    }
    // Método para agregar un observer
    ProductImpl.prototype.attach = function (observer) {
        this.observers.push(observer);
    };
    // Método para eliminar un observer
    ProductImpl.prototype.detach = function (observer) {
        var index = this.observers.indexOf(observer);
        this.observers.splice(index, 1);
    };
    // Método para notificar a los observers
    ProductImpl.prototype.notify = function () {
        for (var _i = 0, _a = this.observers; _i < _a.length; _i++) {
            var observer = _a[_i];
            observer.update(this);
        }
    };
    // Método para restockar el producto
    ProductImpl.prototype.restock = function (amount) {
        this.stock += amount;
        console.log(this.name + " has been restocked with " + amount + " units.");
        this.notify();
    };
    return ProductImpl;
}());
// Código de cliente
var product = new ProductImpl("Product 1", 0);
var customerA = new Customer("Customer A");
var customerB = new Customer("Customer B");
product.attach(customerA);
product.attach(customerB);
product.restock(10);
