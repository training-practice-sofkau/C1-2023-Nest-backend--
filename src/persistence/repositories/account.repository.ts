import { Injectable, NotFoundException } from '@nestjs/common';
import { AccountEntity } from 'src/persistence/entities/account.entity';

@Injectable()
export class AccountRepository {
  private readonly database: Array<AccountEntity>;

  constructor() {
    this.database = new Array<AccountEntity>();
  }

  register(entity: AccountEntity): AccountEntity {
    this.database.push(entity);
    return this.database.at(-1) ?? entity;
  }
  update(id: string, entity: AccountEntity): AccountEntity {
    const index = this.database.findIndex(
      (item) => item.id === id && (item.deleteAt ?? true) === true,
    );
    if (index >= 0) {
      this.database[index] = {
        ...this.database[index],
        ...entity,
        id,
      } as AccountEntity;
    } else {
      throw new NotFoundException(`El ID ${id} no existe en base de datos`);
    }
    return this.database[index];
  }

  delete(id: string, soft?: boolean): void {

  
  }
  private hardDelete(index: number): void {
  this.database.splice(index , 1);

  }

  private softDelete(index: number): void {
    this.database[index].deleteAt = Date.now();
  }

  findAll(): AccountEntity[] {
   return this.database.filter((item) => item.deleteAt === undefined);
  }
  
  findOneById(id: string): AccountEntity {
     const accountData  = this.database.find(
      (item) => item.id === id  && (item.deleteAt ?? true) === true,);
       if (accountData) return accountData;
       else throw new NotFoundException(`El usuario con el id ${id} no se encuentra`);
  }


  findByState(state: boolean): AccountEntity[] {
    throw new Error('This method is not implemented');
  }

  findByCustomer(customerId: string): AccountEntity[] {
    throw new Error('This method is not implemented');
  }

  findByAccountType(accountTypeId: string): AccountEntity[] {
    throw new Error('This method is not implemented');
  }

}