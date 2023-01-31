import { AccountEntity } from 'src/business/persistence/entities';
import { BodyRepositoryInterface } from '../model-repository.interface';

export interface AccountRepositoryInterface
  extends BodyRepositoryInterface<AccountEntity> {
  findByState(state: boolean): AccountEntity[];
  findBalanceGreaterThan(balance: number): AccountEntity[];
  findBalanceLessThan(balance: number): AccountEntity[];
  findByCustomerId(id: string): AccountEntity;
  findByDocumentTypeId(id: string): AccountEntity;
  findByAccountTypeId(id: string): AccountEntity;
  findByStateId(id: string): boolean
  changeStateId(id: string, state: boolean): void
}
