/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { typeAccountEntity } from '../entities/typeAccount.entity';

@Injectable()
export class TypeAccountRepository {
  private readonly database: Array<typeAccountEntity>;

  constructor() {
    this.database = new Array<typeAccountEntity>();
  }

  register(entity: typeAccountEntity): typeAccountEntity {
    throw new Error('This method is not implemented');
  }

  update(id: string, entity: typeAccountEntity): typeAccountEntity {
    throw new Error('This method is not implemented');
  }

  delete(id: string, soft?: boolean): void {
    throw new Error('This method is not implemented');
  }

  findAll(): typeAccountEntity[] {
    throw new Error('This method is not implemented');
  }

  findOneById(id: string): typeAccountEntity {
    throw new Error('This method is not implemented');
  }
}