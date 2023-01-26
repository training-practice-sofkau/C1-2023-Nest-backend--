import { TransferEntity } from 'src/persistence/entities';
import { BaseRepositoryInterface } from './base';

export interface TransferRepositoryInterface
  extends BaseRepositoryInterface<TransferEntity> {
  findByIncomeAccount(accountId: string): Array<TransferEntity>;
  findByOutcomeAccount(accountId: string): Array<TransferEntity>;
  findOutcomeByDataRange(
    accountId: string,
    dateInit: Date | number,
    dateEnd: Date | number,
  ): Array<TransferEntity>;
  findIncomeByDataRange(
    accountId: string,
    dateInit: Date | number,
    dateEnd: Date | number,
  ): Array<TransferEntity>;
}
