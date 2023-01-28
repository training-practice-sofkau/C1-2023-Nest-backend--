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
  hardDelete(id: string): void
  softDelete(id: string): void
  findByStateId(id: string): boolean
  changeStateId(id: string, state: boolean): void
}
