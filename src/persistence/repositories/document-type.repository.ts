import { Injectable } from '@nestjs/common';
import { DocumentTypeEntity } from '../entities';
import { BodyRepositoryAbstract } from './base/base.repository';
import { DocumentTypeRepositoryInterface } from './interface/document-type/document-type-repository.interface';

@Injectable()
export class DocumentTypeRepository
  extends BodyRepositoryAbstract<DocumentTypeEntity>
  implements DocumentTypeRepositoryInterface
{
  register(entity: DocumentTypeEntity): DocumentTypeEntity {
    this.database.push(entity);
    const documentTypeIndex = this.database.findIndex(
      (documentType) => documentType.id === entity.id,
    );
    return this.database[documentTypeIndex];
  }
  update(id: string, entity: DocumentTypeEntity): DocumentTypeEntity {
    const documentTypeIndex = this.database.findIndex(
      (documentType) => documentType.id === id,
    );
    const data = this.database[documentTypeIndex];
    this.database[documentTypeIndex] = {
      ...data,
      ...entity,
      id: id,
    };
    return this.database[documentTypeIndex];
  }
  delete(id: string, soft?: boolean | undefined): void {
    const documentTypeIndex = this.database.findIndex(
      (documentType) => documentType.id === id,
    );
    this.database.splice(documentTypeIndex, 1);
  }
  findAll(): DocumentTypeEntity[] {
    return this.database;
  }
  findOneById(id: string): DocumentTypeEntity {
    const documentTypeIndex = this.database.findIndex(
      (documentType) => documentType.id === id,
    );
    return this.database[documentTypeIndex];
  }
  findByState(state: boolean): DocumentTypeEntity[] {
    let arrayState: DocumentTypeEntity[] = [];
    this.database.map((documentType) => {
      if (documentType.state === state) {
        arrayState.push(documentType);
      }
    });
    return arrayState;
  }
}
