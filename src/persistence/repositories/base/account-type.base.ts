export abstract class AccountType {
  constructor(public name: string) {}

  printName(): void {
    console.log('name: ' + this.name);
  }
}

/*export class Ahorro extends AccountType {
  printName(): void {
    throw new Error('Method not implemented.');
  }
}

export class Corriente extends AccountType {
  printName(): void {
    throw new Error('Method not implemented.');
  }
}
*/
