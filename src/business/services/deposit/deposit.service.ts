import { Injectable } from '@nestjs/common';
import { DepositDTO } from 'src/business/dtos';
import { PaginationModel, DataRangeModel } from '../../../data/models';
import { DepositEntity } from '../../../data/persistence/entities';
import {
  AccountRepository,
  DepositRepository,
} from '../../../data/persistence/repositories';

@Injectable()
export class DepositService {
  constructor(
    private readonly depositRepository: DepositRepository,
    private readonly accountRepository: AccountRepository,
  ) {}

  /**
   * Crear un deposito
   *
   * @param {DepositModel} deposit
   * @return {*}  {DepositEntity}
   * @memberof DepositService
   */
  createDeposit(deposit: DepositDTO): DepositEntity {
    const depositEntity = new DepositEntity();
    depositEntity.account = this.accountRepository.findOneById(
      deposit.accountId,
    );
    return this.depositRepository.register(depositEntity);
  }

  /**
   * Borrar un deposito
   *
   * @param {string} depositId
   * @memberof DepositService
   */
  deleteDeposit(depositId: string): void {
    this.depositRepository.delete(depositId);
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
    if (dataRange) {
      const newArray = this.depositRepository.findByDataRange(
        dataRange.start,
        dataRange.end,
      );
      const array = newArray.filter((item) => item.account.id === accountId);
      const arrayReturn = [];
      for (let i = 0; i < newArray.length; i += 10) {
        arrayReturn.push(array.slice(i, i + 10));
      }
      return arrayReturn[pagination.page];
    }
    const array = this.depositRepository
      .findAll()
      .filter((item) => item.account.id === accountId);
    return array;
  }
}
