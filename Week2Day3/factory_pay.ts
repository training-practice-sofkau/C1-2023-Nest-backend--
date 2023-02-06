interface PaymentMethod {
    // Método para calcular el total a pagar
    calculateTotal(price: number): number;
  }
  
  class Cash implements PaymentMethod {
    // Calcula el total a pagar y devuelve el precio sin descuento
    calculateTotal(price: number): number {
      return price;
    }
  }
  
  class Card implements PaymentMethod {
    // Calcula el total a pagar y devuelve el precio con un descuento del 5%
    calculateTotal(price: number): number {
      return price * 0.95;
    }
  }
  
  // Factory Method
  class PaymentMethodFactory {
    static getPaymentMethod(type: string): PaymentMethod {
      switch (type) {
        case "cash":
          return new Cash();
        case "card":
          return new Card();
        default:
          throw new Error("Tipo de pago no reconocido.");
      }
    }
  }
  
  // Código de cliente
  const paymentMethod = PaymentMethodFactory.getPaymentMethod("card");
  const total = paymentMethod.calculateTotal(100);
  console.log(`El total a pagar es: ${total}`);
  