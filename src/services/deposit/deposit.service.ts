import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { DepositModel } from 'src/models';
import { DepositEntity } from 'src/persistence/entities';
import { DepositRepository } from 'src/persistence/repositories/deposit.repository';
import { AccountService } from '../account';

@Injectable()
export class DepositService {
    constructor(private readonly depositRepository: DepositRepository, private readonly accountService: AccountService) { }
    /**
   * Crear un deposito
   *
   * @param {DepositModel} deposit
   * @return {*}  {DepositEntity}
   * @memberof DepositService
   */
    createDeposit(deposit: DepositModel): DepositEntity {
        if (this.accountService.getState(deposit.account.id)) {
            deposit.dateTime = Date.now()
            return this.depositRepository.register(deposit)
        }
        else {
            throw new NotFoundException("La cuenta no se encuentra activa")
        }

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