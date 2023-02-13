// que a los usuarios les llegue su notificacion
interface Observer {
  update(): void;
}

interface Subject {
  attach(observer: Observer): void;

  detach(observer: Observer): void;

  notify(): void;
}

abstract class ConSubject implements Subject {
  private observer: Observer[] = [];

  public attach(observer: Observer): void {
    const isExist = this.observer.includes(observer);
    if (isExist) {
      return console.log('El observador ya ha sido registrado en el pasado.');
    }

    console.log('El observador a ha sido registrado.');
    this.observer.push(observer);
  }

  public detach(observer: Observer): void {
    const observerIndex = this.observer.indexOf(observer);
    if (observerIndex === -1) {
      return console.log('el observador no existe.');
    }

    this.observer.splice(observerIndex, 1);
    console.log('observador eliminado.');
  }

  public notify(): void {
    this.observer.forEach((x) => x.update());
  }
}

//CREAR CLASES OBSERVADORAS
class Usario1 implements Observer {
  public update(): void {
    console.log('Ha llegado una notificacion');
  }
}

//app
class App extends ConSubject {
  add(notification: string) {
    console.log('la notificaion es: ', notification);
    this.notify();
  }
}

//IMPLEMENTACION
//observadores
const usuario1 = new Usario1();

//sujeto, el que avisa cuando hay notificaciones
const app = new App();

// el usuario1 se inscribe en sujeto, y va estar escuchando cualquier notificaciones
app.attach(usuario1);

//agregar una notificacion
app.add('notificacion 1');
app.add('notificacion 2');
