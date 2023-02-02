import { BaseRepositoryInterface } from './base/';
import { TransferEntity } from '../../entities';

export interface TransferRepositoryInterface
  extends BaseRepositoryInterface<TransferEntity> {
  findAll(): TransferEntity[];
  findOneById(id: string): TransferEntity;
  findOutcomeByDataRange(
    accountId: string,
    dateInit: Date | number,
    dateEnd: Date | number,
  ): TransferEntity[];

  findIncomeByDataRange(
    accountId: string,
    dateInit: Date | number,
    dateEnd: Date | number,
  ): TransferEntity[];
}
