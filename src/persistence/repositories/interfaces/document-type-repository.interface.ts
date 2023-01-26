import { DocumentTypeEntity } from 'src/persistence/entities';
import { BaseRepositoryInterface } from './base';

export interface DocumentTypeRepositoryInterface
  extends BaseRepositoryInterface<DocumentTypeEntity> {
  findDocumentTypeByState(State: boolean): Array<DocumentTypeEntity>;
}
