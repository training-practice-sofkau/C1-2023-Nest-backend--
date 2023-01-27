import { Injectable } from '@nestjs/common';
import { DepositModel } from 'src/models';
import { DepositEntity } from 'src/persistence/entities';
import { DepositRepository } from 'src/persistence/repositories';

@Injectable()
export class DepositService {
  constructor(private readonly depositRepository: DepositRepository) { }

  //Creacion de un deposito
  async createDeposit(deposit: DepositModel): Promise<DepositEntity> {
    const newDeposit = new DepositEntity();
    newDeposit.account = deposit.account;
    newDeposit.amount = deposit.amount;
    newDeposit.dateTime = Date.now();
    this.depositRepository.register(newDeposit);
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
    dataRange?: number,
  ): Promise<DepositEntity[]> {
    const currentDeposits = this.depositRepository.findByAccountId(accountId);
    return currentDeposits;
  }
}
