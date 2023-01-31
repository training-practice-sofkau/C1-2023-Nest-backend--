import { BaseRepositoryInterface } from './base/';
import { DocumentTypeEntity } from '../../entities';

export interface DocumentTypeRepositoryInterface
  extends BaseRepositoryInterface<DocumentTypeEntity> {
  findByState(state: boolean): DocumentTypeEntity[];
  findByName(name: string): DocumentTypeEntity[];
}
