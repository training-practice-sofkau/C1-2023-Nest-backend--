import { Injectable } from '@nestjs/common';
import { DepositModel } from 'src/models';
import { DepositEntity } from 'src/persistence/entities/deposite.entity';
import { DepositeRepository } from 'src/persistence/repositories/deposite.repository';

@Injectable()
export class DepositService {
  constructor(private readonly depositRepository: DepositeRepository ) {}
  /**
   * Crear un deposito
   *
   * @param {DepositModel} deposit
   * @return {*}  {DepositEntity}
   * @memberof DepositService
   */
  createDeposit(deposit: DepositModel): DepositEntity {
    throw new Error('This method is not implemented');
  }

  /**
   * Borrar un deposito
   *
   * @param {string} depositId
   * @memberof DepositService
   */
  deleteDeposit(depositId: string): void {
    throw new Error('This method is not implemented');
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
