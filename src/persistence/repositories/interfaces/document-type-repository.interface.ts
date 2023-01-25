import { BaseRepositoryInterface } from './base';
import { DocumentTypeEntity } from '../../entities';

export interface DocumentTypeRepositoryInterface
  extends BaseRepositoryInterface<DocumentTypeEntity> {
  fun(accountId: string): void; // una funcion unica para la cuenta
}
