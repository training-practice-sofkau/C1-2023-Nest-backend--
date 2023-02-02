import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { DataRangeModel, DepositModel, PaginationModel } from 'src/models';
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
        const deposit = this.depositRepository.findOneById(depositId)
        if (deposit.deletedAt === undefined) {
            this.depositRepository.delete(depositId, true)
        }
        else {
            this.depositRepository.delete(depositId, false)
        }
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
        const arrayTransfer = this.depositRepository.findByDateRange(accountId, 0, Date.now())
        const arrayTransferReturn: DepositEntity[] = []
        let range = 0
        pagination.size = arrayTransfer.length;
        if (dataRange?.range === undefined) {
            range = 10
        }
        else {
            range = dataRange.range
        }
        pagination.numberPages = Math.round(pagination.size / range)
        for (let x = 1 + range * (pagination.actualPage - 1); x < 1 + range + (range * (pagination.actualPage - 1)); x++) {
            arrayTransferReturn.push(arrayTransfer[x-1])
        }
        return arrayTransferReturn
    }
}