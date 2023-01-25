import { Injectable } from '@nestjs/common';
import { DocumentTypeEntity } from '../entities';
import { BodyRepositoryAbstract } from './base/base.repository';
import { DocumentTypeRepositoryInterface } from './interface/document-type/document-type-repository.interface';

@Injectable()
export class DocumentTypeRepository
  extends BodyRepositoryAbstract<DocumentTypeEntity>
  implements DocumentTypeRepositoryInterface {
    register(entity: DocumentTypeEntity): DocumentTypeEntity {
        throw new Error('This method is not implemented');
    }
    update(id: string, entity: DocumentTypeEntity): DocumentTypeEntity {
        throw new Error('This method is not implemented');
    }
    delete(id: string, soft?: boolean | undefined): void {
        throw new Error('This method is not implemented');
    }
    findAll(): DocumentTypeEntity[] {
        throw new Error('This method is not implemented');
    }
    findOneById(id: string): DocumentTypeEntity {
        throw new Error('This method is not implemented');
    }
  }
