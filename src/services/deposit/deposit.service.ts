import { Injectable } from '@nestjs/common';
import { DataRangeModel, DepositModel, PaginationModel } from 'src/models';
import { DepositEntity } from 'src/persistence/entities';
import { DepositRepository } from 'src/persistence/repositories';
import { AccountService } from '../account';

@Injectable()
export class DepositService {
  constructor(
    private readonly depositRepository: DepositRepository,
    private readonly accountService: AccountService,
  ) {}

  //Creacion de un deposito y actualiza el balance de la cuenta afectada
  async createDeposit(deposit: DepositModel): Promise<DepositEntity> {
    const newDeposit = new DepositEntity();
    newDeposit.account = deposit.account;
    newDeposit.amount = deposit.amount;
    newDeposit.dateTime = Date.now();
    this.depositRepository.register(newDeposit);
    this.accountService.addBalance(newDeposit.account.id, newDeposit.amount);
    return newDeposit;
  }

  //Eliminacion de un deposito
  async deleteDeposit(depositId: string): Promise<void> {
    this.depositRepository.delete(depositId, true);
  }

  //Retorna el listado de depositos relacionados a la cuenta de acuerdo a la paginacion solicitada
  async getHistory(
    accountId: string,
    pagination: PaginationModel,
    dataRange?: DataRangeModel,
  ): Promise<DepositEntity[]> {
    const currentDeposits = this.depositRepository.findByAccountId(accountId);
    pagination.size = currentDeposits.length;
    const deposits: DepositEntity[] = [];
    let range = 0;
    if (dataRange && dataRange.range > 0) {
      range = dataRange.range;
    } else {
      range = 10;
    }
    pagination.pages = Math.round(pagination.size / range);
    for (
      let i = pagination.currentPage * range;
      i < pagination.currentPage * range + range;
      i++
    ) {
      deposits.push(currentDeposits[i + 1]);
    }
    return deposits;
  }
}
