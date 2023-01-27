import { DepositEntity } from 'src/persistence/entities';
import { BodyRepositoryInterface } from '../model-repository.interface';

export interface DepositRepositoryInterface
  extends BodyRepositoryInterface<DepositEntity> {
  findByAccountId(accountId: string): DepositEntity;
  findByCustomerId(customerId: string): DepositEntity;
  findByAccountTypeId(accountTypeId: string): DepositEntity;
  findByDocumentTypeId(documentTypeId: string): DepositEntity;
  findByEmail(email: string): DepositEntity;
  findAmountGreaterThan(amount: number): DepositEntity[];
  findAmountLessThan(amount: number): DepositEntity[];
  private hardDelete(id: string): void;
  private softDelete(id: string): void
  findByDateRange(id: string, DateMin: Date | number, DateMax: Date | Number): DepositEntity[]
}
