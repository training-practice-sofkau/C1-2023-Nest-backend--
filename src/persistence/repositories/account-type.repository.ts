import { Injectable } from '@nestjs/common';
import { AccountTypeEntity } from '../entities';
@Injectable()
export class DocumentTypeRepository {
  private readonly database: Array<AccountTypeEntity>;

  constructor() {
    this.database = new Array<AccountTypeEntity>();
  }

  register(): AccountTypeEntity {
    throw new Error('This method is not implemented');
  }

  update(): AccountTypeEntity {
    throw new Error('This method is not implemented');
  }

  delete(): void {
    throw new Error('This method is not implemented');
  }

  findAll(): AccountTypeEntity[] {
    throw new Error('This method is not implemented');
  }

  findOneById(): AccountTypeEntity {
    throw new Error('This method is not implemented');
  }
}
