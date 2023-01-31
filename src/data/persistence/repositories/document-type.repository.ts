import { Injectable, NotFoundException } from '@nestjs/common';
import { DocumentTypeEntity } from '../entities';
import { BaseRepository } from './base';
import { DocumentTypeRepositoryInterface } from './interfaces';

@Injectable()
export class DocumentTypeRepository
  extends BaseRepository<DocumentTypeEntity>
  implements DocumentTypeRepositoryInterface
{
  constructor() {
    super();
    this.database.push({
      id: 'c822487e-5e89-4a49-98d5-50ce60b300b1',
      name: 'Cedula de ciudadania',
      state: true,
    });
    this.database.push({
      id: '64911806-283f-4e71-ab94-f9098e18cf9a',
      name: 'Cedula de extranjeria',
      state: true,
    });
  }

  register(entity: DocumentTypeEntity): DocumentTypeEntity {
    this.database.push(entity);
    return this.database.at(-1) ?? entity;
  }

  update(id: string, entity: DocumentTypeEntity): DocumentTypeEntity {
    const index = this.database.findIndex((item) => item.id === id);
    const data = this.database[index];
    if (index >= 0) {
      this.database[index] = {
        ...data,
        ...entity,
        id,
      } as DocumentTypeEntity;
    } else {
      throw new NotFoundException(`El Id: ${id} no existe en base de datos`);
    }
    return this.database[index];
  }

  delete(id: string, soft?: boolean): void {
    const index = this.database.findIndex((item) => item.id === id);
    this.database.splice(index, 1);
  }

  findAll(): DocumentTypeEntity[] {
    return this.findByState(true);
  }

  findOneById(id: string): DocumentTypeEntity {
    const documentType = this.database.find((item) => item.id === id);
    if (documentType) return documentType;
    else throw new NotFoundException(`El ID ${id} no existe en base de datos`);
  }

  findByState(state: boolean): DocumentTypeEntity[] {
    return this.database.filter((item) => item.state === state);
  }

  findByName(name: string): DocumentTypeEntity[] {
    return this.database.filter((item) => item.name === name);
  }
}
