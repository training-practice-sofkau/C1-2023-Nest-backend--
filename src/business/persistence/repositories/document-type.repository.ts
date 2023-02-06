import { Injectable, NotFoundException } from '@nestjs/common';
import { DocumentTypeEntity } from '../entities';
import { BodyRepositoryAbstract } from './base/base.repository';
import { DocumentTypeRepositoryInterface } from './interface/document-type/document-type-repository.interface';
import { CustomerRepository } from './customer.repository';

@Injectable()
export class DocumentTypeRepository
  extends BodyRepositoryAbstract<DocumentTypeEntity>
  implements DocumentTypeRepositoryInterface {
  register(entity: DocumentTypeEntity): DocumentTypeEntity {
    this.database.push(entity);
    return this.database.at(-1) ?? entity;
  }
  update(id: string, entity: DocumentTypeEntity): DocumentTypeEntity {
    const documentTypeIndex = this.database.findIndex(
      (documentType) => documentType.id === id,
    );
    if (documentTypeIndex >= 0) {
      const data = this.database[documentTypeIndex];
      this.database[documentTypeIndex] = {
        ...data,
        ...entity,
        id: id,
      };
      return this.database[documentTypeIndex];
    }
    else {
      throw new NotFoundException("No se encontro la informacion")
    }
  }
  delete(id: string, soft?: boolean | undefined): void {
    const account = new CustomerRepository()
    const result = account.findByDocumentTypeId(id);
    if (result) {
      throw new NotFoundException("No se puede eliminar, depende de otra entidad")
    }
    else {
      const accountTypeIndex = this.database.findIndex(
        (accountType) => accountType.id === id,
      );
      this.database.splice(accountTypeIndex, 1);
    }
  }
  findAll(): DocumentTypeEntity[] {
    return this.database;
  }
  findOneById(id: string): DocumentTypeEntity {
    const documentTypeIndex = this.database.findIndex(
      (documentType) => documentType.id === id,
    );
    if (documentTypeIndex >= 0) {
      return this.database[documentTypeIndex];
    }
    else {
      throw new NotFoundException("No se encontro la informacion")
    }
  }
  findByState(state: boolean): DocumentTypeEntity[] {
    let arrayState: DocumentTypeEntity[] = [];
    this.database.map((documentType) => {
      if (documentType.state === state) {
        arrayState.push(documentType);
      }
    });
    if (arrayState.length > 0) {
      return arrayState
    }
    else {
      throw new NotFoundException("No se encontro la informacion")
    }
  }
  findByName(name: string): DocumentTypeEntity[] {
    let arrayName: DocumentTypeEntity[] = [];
    this.database.map(documentType => {
      if (documentType.name.includes(name)) {
        arrayName.push(documentType)
      }
    })
    if (arrayName.length > 0) {
      return arrayName
    }
    else {
      throw new NotFoundException("No se encontro la informacion")
    }
  }
}
