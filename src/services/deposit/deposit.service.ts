import { Injectable } from '@nestjs/common';
import { DepositModel } from '../../models';
import { DepositEntity } from '../../persistence/entities';
import { DepositRepository } from '../../persistence/repositories';

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
    const depositEntity = new DepositEntity();
    depositEntity.account = deposit.account;
    return this.depositRepository.register(depositEntity);
  }

  /**
   * Borrar un deposito
   *
   * @param {string} depositId
   * @memberof DepositService
   */
  deleteDeposit(depositId: string): void {
    this.accountRepository.delete(accountId);
  }

  /**
   * Obtener el historial de los depósitos en una cuenta
   *
   * @param {string} accountId
   * @param {PaginationModel} pagination
   * @param {DataRangeModel} [dataRange]
   * @return {*}  {DepositEntity[]}
   * @memberof DepositService
   */
  getHistory(
    accountId: string,
    pagination: PaginationModel,
    dataRange?: DataRangeModel,
  ): DepositEntity[] {
    throw new Error('This method is not implemented');
  }
}
