import { AccountRepository } from './../../../data/persistence/repositories/account.repository';
import { NewDepositDTO } from './../../dtos/deposit.dro';
import { Injectable, NotFoundException } from '@nestjs/common';
import { DepositModel } from 'src/data/models';
import { DataRangeModel } from 'src/data/models/data-range.model';
import { PaginationModel } from 'src/data/models/pagination.model';
import { DepositEntity } from 'src/data/persistence/entities/deposite.entity';
import { DepositRepository } from 'src/data/persistence/repositories/deposit.repository';
import { AccountService } from '../account/account.service';

@Injectable()
export class DepositService {
    constructor(private readonly depositRepository: DepositRepository, private readonly accountService: AccountService,
        private readonly accountRepository: AccountRepository) { }
    /**
   * Crear un deposito
   *
   * @param {DepositModel} deposit
   * @return {*}  {DepositEntity}
   * @memberof DepositService
   */
    createDeposit(deposit: NewDepositDTO): DepositEntity {
        const newDeposit = new DepositEntity();
        const newAccount = this.accountRepository.findOneById(deposit.account);
        if (this.accountService.getState(deposit.account)) {
          newDeposit.amount = deposit.amount;
          newDeposit.dateTime = Date.now();
          newAccount.id = deposit.account;
          newDeposit.account = newAccount;
          this.accountService.addBalance(deposit.account, deposit.amount);
          return this.depositRepository.register(newDeposit);
    } else {
      throw new NotFoundException('La cuenta no se encuentra activa');
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
        const arrayTransfer = this.depositRepository.findByDataRange(accountId, 0, Date.now())
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
