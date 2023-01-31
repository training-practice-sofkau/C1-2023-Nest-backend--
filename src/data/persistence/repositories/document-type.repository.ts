import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DocumentTypeEntity } from '../entities';
import { BaseRepository } from './base';
import { DocumentTypeRepositoryInterface } from './interfaces';

@Injectable()
export class DocumentTypeRepository
  extends BaseRepository<DocumentTypeEntity>
  implements DocumentTypeRepositoryInterface
{
  findByState(state: boolean): DocumentTypeEntity[] {
    const currentDocumentTypes = this.database.filter((d) => d.state === state);
    return currentDocumentTypes;
  }

  findByName(name: string): DocumentTypeEntity[] {
    const currentDocumentTypes = this.database.filter(
      (n) => n.name.toLowerCase().indexOf(name.toLowerCase()) !== -1,
    );
    return currentDocumentTypes;
  }

  register(entity: DocumentTypeEntity): DocumentTypeEntity {
    const currentDocumentType = this.database.find((d) => d.id === entity.id);
    if (currentDocumentType) {
      throw new ConflictException(
        'El tipo de documento que intenta registrar ya existe en la base de datos',
      );
    }
    this.database.push(entity);
    return this.database.at(-1) ?? entity;
  }

  upate(id: string, entity: DocumentTypeEntity): DocumentTypeEntity {
    const currentDocumentType = this.findOneById(id);
    if (JSON.stringify(currentDocumentType) === JSON.stringify(entity)) {
      throw new ConflictException('Los datos a actualizar ya existen');
    }
    const index = this.database.findIndex((d) => d.id === id);
    this.database[index] = {
      ...currentDocumentType,
      ...entity,
      id: id,
    };
    return this.database[index];
  }

  delete(id: string, soft?: boolean): void {
    this.findOneById(id);
    if (soft) {
      throw new BadRequestException(
        'El borrado lógico no está implementado para tipos de documentos',
      );
    }
    const index = this.database.findIndex((d) => d.id === id);
    this.database.splice(index, 1);
  }

  findAll(): DocumentTypeEntity[] {
    return this.database;
  }

  findOneById(id: string): DocumentTypeEntity {
    const hardDocumentTypeDataBase = [
      {
        id: 'e07aeb4c-3765-46cd-b8e2-944a928dd497',
        name: 'Cédula de ciudadanía',
        state: true,
      },
      {
        id: 'ab850306-6de3-44ce-ab88-844b2e301c52',
        name: 'Cédula de extrangería',
        state: true,
      },
    ];
    const currentDocumentType = hardDocumentTypeDataBase.find(
      (d) => d.id === id,
    );
    if (currentDocumentType) return currentDocumentType;
    throw new NotFoundException(
      `El tipo de documento con el Id ${id} no existe en la base de datos`,
    );
  }
}
