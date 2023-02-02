// Definición de la interfaz Observer
interface Observer {
    // Método para recibir notificaciones de un producto
    update(product: Product): void;
}

// Definición de la interfaz Product
interface Product {
    // Propiedades del producto
    name: string;
    stock: number;

    // Método para agregar un observer
    attach(observer: Observer): void;

    // Método para eliminar un observer
    detach(observer: Observer): void;

    // Método para notificar a los observers
    notify(): void;
}

// Implementación de la clase Customer que implementa la interfaz Observer
class Customer implements Observer {
    constructor(private name: string) {}

    // Método update para manejar la notificación
    public update(product: Product): void {
        console.log(`${this.name} received notification: ${product.name} is now in stock and has ${product.stock} units available.`);
    }
}

// Implementación de la clase ProductImpl que implementa la interfaz Product
class ProductImpl implements Product {
    // Lista de observadores
    private observers: Observer[] = [];
    public name: string;
    public stock: number;

    constructor(name: string, stock: number) {
        this.name = name;
        this.stock = stock;
    }

    // Método para agregar un observer
    public attach(observer: Observer): void {
        this.observers.push(observer);
    }

    // Método para eliminar un observer
    public detach(observer: Observer): void {
        const index = this.observers.indexOf(observer);
        this.observers.splice(index, 1);
    }

    // Método para notificar a los observers
    public notify(): void {
        for (const observer of this.observers) {
            observer.update(this);
        }
    }

    // Método para restockar el producto
    public restock(amount: number): void {
        this.stock += amount;
        console.log(`${this.name} has been restocked with ${amount} units.`);
        this.notify();
    }
}

// Código de cliente
const product = new ProductImpl("Product 1", 0);
const customerA = new Customer("Customer A");
const customerB = new Customer("Customer B");
product.attach(customerA);
product.attach(customerB);
product.restock(10);
