import { Injectable } from '@nestjs/common';
import { depositEntity } from '../entities'

@Injectable()
export class dispositRepository {
  private readonly database: Array<depositEntity>;

  constructor() {
    this.database = new Array<depositEntity>();
  }

  register(entity: depositEntity): depositEntity {
    throw new Error('This method is not implemented');
  }

  update(id: string, entity: depositEntity): depositEntity {
    throw new Error('This method is not implemented');
  }

  delete(id: string, soft?: boolean | undefined): void {
    throw new Error('This method is not implemented');
  }

  findAll(): depositEntity[] {
    throw new Error('This method is not implemented');
  }

  findOneById(id: string): depositEntity {
    throw new Error('This method is not implemented');
  }
}