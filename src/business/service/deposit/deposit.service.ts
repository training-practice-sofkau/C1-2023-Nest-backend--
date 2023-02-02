import { Injectable, NotFoundException } from '@nestjs/common';
import { DepositModel } from 'src/data/models';
import { DepositEntity } from 'src/data/persistence/entities';
import { DepositRepository } from 'src/data/persistence/repository';

@Injectable()
export class DepositService {
  constructor(private readonly depositRepository: DepositRepository) {}
  /**
   * Crear un deposito
   *
   * @param {DepositModel} deposit
   * @return {*}  {DepositEntity}
   * @memberof DepositService
   */
  createDeposit(deposit: DepositModel): DepositEntity {
    const depositNew = new DepositEntity();
    depositNew.account = deposit.account;
    depositNew.amount = deposit.amount;
    depositNew.dateTime = Date.now();
    return this.depositRepository.register(depositNew);
  }

  /**
   * Borrar un deposito
   *
   * @param {string} depositId
   * @memberof DepositService
   */
  deleteDeposit(depositId: string): void {
    const deposit = this.depositRepository.findOneById(depositId);
    if (deposit.deletedAt === undefined) {
      this.depositRepository.delete(depositId, true);
    } else {
      this.depositRepository.delete(depositId, false);
    }
  }
  /**
   * Obtener el historial de los depósitos en una cuenta
   *
   * @param {string} accountId
   * @param {PaginationModel} pagination
   * @param {DataRangeModel} [dateRange]
   * @return {*}  {DepositEntity[]}
   * @memberof DepositService
   */
  // getHistory(
  //   accountId: string,
  //   pagination?: Pagination,
  //   dataRange?: DateRange,
  // ): DepositEntity[] {
  //   if (dataRange) {
  //     return this.depositRepository.findByDataRange(
  //       accountId,
  //       dataRange?.dateInit,
  //       dataRange?.dateEnd,
  //       pagination,
  //     );
  //   } else return this.depositRepository.findByAccountId(accountId, pagination);
  // }
}
