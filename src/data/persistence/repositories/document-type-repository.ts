import { Injectable, NotFoundException } from '@nestjs/common';
import { DocumentTypeEntity } from '../entities';
import { BaseRepository } from './base/base.repository';
import { DocumentTypeInterface } from './interfaces/document-type-repository.interface';

@Injectable()
export class DocumentTypeRepository
extends BaseRepository<DocumentTypeEntity>
implements DocumentTypeInterface
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

  delete(id: string): void {
    const index = this.database.findIndex((item) => item.id === id);
    if (index == -1) {
      throw new Error('Method is not implemented');
    }
    this.database.splice(index, 1);
  }

  findAll(): DocumentTypeEntity[] {
   return this.database;
  }

  findOneById(id : string): DocumentTypeEntity {
    const docId = this.database.find((item) => item.id === id);
    if(docId) return docId;
    else throw new NotFoundException(`El Id ${id} No se encuentra en la base de datos`);
  }
  findByState(state : boolean): DocumentTypeEntity[] {
    const status = this.database.filter((item) => item.state == state)
    return status;
  }

  findByName(name: string): DocumentTypeEntity[] {
    const userName = this.database.filter((item) => item.name == name);
    return userName;
  }
}
