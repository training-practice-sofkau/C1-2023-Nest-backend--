import { AccountEntity } from 'src/persistence/entities';
import { BodyRepositoryInterface } from '../model-repository.interface';

export interface AccountRepositoryInterface
  extends BodyRepositoryInterface<AccountEntity> {
  findByState(state: boolean): AccountEntity[];
  findBalanceGreaterThan(balance: number): AccountEntity[];
  findBalanceLessThan(balance: number): AccountEntity[];
  findByCustomerId(id: string): AccountEntity;
  findByDocumentTypeId(id: string): AccountEntity;
  findByAccountTypeId(id: string): AccountEntity;
  private hardDelete(id: string): void
  private softDelete(id: string): void
}
