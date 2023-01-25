import { BaseRepositoryInterface } from './base';
import { DepositEntity } from '../../entities';

export interface DepositRepositoryInterface
  extends BaseRepositoryInterface<DepositEntity> {
  findByAccountId(accountId: string): void; // una funcion unica para la cuenta
}
