import { Injectable, NotFoundException } from '@nestjs/common';
import { DocumentTypeEntity } from '../entities';
import { BaseRepository } from './base';
import { DocumentTypeRepositoryInterface } from './interfaces';

@Injectable()
export class DocumentTypeRepository
  extends BaseRepository<DocumentTypeEntity>
  implements DocumentTypeRepositoryInterface
{
  register(entity: DocumentTypeEntity): DocumentTypeEntity {
    this.database.push(entity);
    return this.database.at(-1) ?? entity;
  }

  update(id: string, entity: DocumentTypeEntity): DocumentTypeEntity {
    const index = this.database.findIndex((item) => item.id === id);
    if (index >= 0) {
      this.database[index] = {
        ...this.database[index],
        ...entity,
        id,
      } as DocumentTypeEntity;
    } else {
      throw new NotFoundException(`El ID ${id} no existe en base de datos`);
    }
    return this.database[index];
  }

  delete(id: string, _soft?: boolean): void {
    const index = this.database.findIndex((item) => item.id === id);
    this.database.splice(index, 1);
  }

  findAll(): DocumentTypeEntity[] {
    return this.database;
  }

  findOneById(id: string): DocumentTypeEntity {
    const deposit = this.database.find((item) => item.id === id);
    if (deposit) return deposit;
    else throw new NotFoundException(`El ID ${id} no existe en base de datos`);
  }

  findByState(state: boolean): DocumentTypeEntity[] {
    const documentTypes = this.database.filter((item) => item.state === state);
    return documentTypes;
  }

  findByName(name: string): DocumentTypeEntity[] {
    const documentTypes = this.database.filter((item) => item.name === name);
    return documentTypes;
  }
}
