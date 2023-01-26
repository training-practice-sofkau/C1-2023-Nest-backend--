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
      (item) => item.id === id && (item.delateAt ?? true) === true,
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

  delete(): void {
    throw new Error('This method is not implemented');
  }

  findAll(): AccountEntity[] {
    throw new Error('This method is not implemented');
  }

  findOneById(): AccountEntity {
    throw new Error('This method is not implemented');
  }
}
