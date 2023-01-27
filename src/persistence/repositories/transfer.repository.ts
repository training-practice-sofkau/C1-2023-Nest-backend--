import { Injectable } from '@nestjs/common';
import { transferEntity } from '../entities'

@Injectable()
export class transferRepository {
  private readonly database: Array<transferEntity>;

  constructor() {
    this.database = new Array<transferEntity>();
  }

  register(entity: transferEntity): transferEntity {
    throw new Error('This method is not implemented');
  }

  update(id: string, entity: transferEntity): transferEntity {
    throw new Error('This method is not implemented');
  }

  delete(id: string, soft?: boolean | undefined): void {
    throw new Error('This method is not implemented');
  }

  findAll(): transferEntity[] {
    throw new Error('This method is not implemented');
  }

  findOneById(id: string): transferEntity {
    throw new Error('This method is not implemented');
  }
}