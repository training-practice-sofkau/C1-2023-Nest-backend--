import { Injectable } from '@nestjs/common';
import { DepositEntity } from '../../persistence';
import { DateTimeRangeDTO, NewDepositDTO, PaginationDTO } from '../../dtos';

@Injectable()
export class DepositService {
  /**
   * Crear un deposito
   *
   * @param {NewDepositDTO} deposit
   * @return {*}  {DepositEntity}
   * @memberof DepositService
   */
  createDeposit(deposit: NewDepositDTO): DepositEntity {
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
   * @param {string} depositId
   * @param {PaginationDTO} pagination
   * @param {DateTimeRangeDTO} [dataRange]
   * @return {*}  {DepositEntity[]}
   * @memberof DepositService
   */
  getHistory(
    depositId: string,
    pagination: PaginationDTO,
    dataRange?: DateTimeRangeDTO,
  ): DepositEntity[] {
    throw new Error('This method is not implemented');
  }
}
