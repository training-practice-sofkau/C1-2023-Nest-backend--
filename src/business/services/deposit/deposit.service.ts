import { Injectable } from '@nestjs/common';
<<<<<<< HEAD:src/services/deposit/deposit.service.ts
import { DepositModel } from 'src/models';
import { DepositEntity } from 'src/persistence/entities/deposite.entity';
import { DepositeRepository } from 'src/persistence/repositories/deposite.repository';
=======
import { DepositEntity } from '../../persistence';
import { DateTimeRangeDTO, NewDepositDTO, PaginationDTO } from '../../dtos';
>>>>>>> ce0c2b8e7f614be9e53400ebc5dbbf0ba6ffd7e0:src/business/services/deposit/deposit.service.ts

@Injectable()
export class DepositService {
  constructor(private readonly depositRepository: DepositeRepository ) {}
  /**
   * Crear un deposito
   *
   * @param {NewDepositDTO} deposit
   * @return {*}  {DepositEntity}
   * @memberof DepositService
   */
  createDeposit(deposit: DepositModel): DepositEntity {
    const account = this.depositRepository.register(deposit);
    return account
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
