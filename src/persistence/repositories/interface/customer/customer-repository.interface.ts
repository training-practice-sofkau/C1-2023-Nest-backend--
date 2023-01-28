import { CustomerEntity } from 'src/persistence/entities';
import { BodyRepositoryInterface } from '../model-repository.interface';

export interface CustomerRepositoryInterface
  extends BodyRepositoryInterface<CustomerEntity> {
  findByDocumentTypeId(documentTypeId: string): CustomerEntity;
  findByEmail(email: string): CustomerEntity;
  findByState(state: boolean): CustomerEntity[];
  findEmailAndPassword(email: string, password: string): boolean
  findByFullName(name: string): CustomerEntity[]
  hardDelete(id: string): void
  softDelete(id: string): void
  findByPhone(phone: string): CustomerEntity[]
}
