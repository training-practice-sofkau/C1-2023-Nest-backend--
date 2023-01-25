import { BaseRepositoryInterface } from './base';
import { TransferEntity } from '../../entities';

export interface TransferRepositoryInterface
  extends BaseRepositoryInterface<TransferEntity> {
  findByAccountId(accountId: string): void; // una funcion unica
}
