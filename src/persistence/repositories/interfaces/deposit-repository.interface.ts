import { BaseRepositoryInterface } from './base';
import { DepositEntity } from '../../entities';

export interface DepositRepositoryInterface
  extends BaseRepositoryInterface<DepositEntity> {
  findOneById(id: string): DepositEntity;

  findByAccountId(accountId: string): DepositEntity[];

  findByDataRange(
    dateInit: Date | number,
    dateEnd: Date | number,
  ): DepositEntity[];
}
