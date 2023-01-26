import { BaseRepositoryInterface } from './base/base-repository.interface';
import { CustomerEntity } from 'src/persistence/entities';

export interface CustomerInterface
  extends BaseRepositoryInterface<CustomerEntity> {
  findDocumentById(documentId: string): CustomerEntity;
}
