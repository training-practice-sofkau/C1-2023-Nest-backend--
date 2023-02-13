import { Injectable } from '@nestjs/common';
import { DataRangeModel } from 'src/data/models/dataRange.model';
import { PaginationModel } from 'src/data/models/pagination.model';
import { AccountEntity, DepositEntity } from 'src/data/persistence';
import { AccountRepository } from 'src/data/persistence/repositories/account.repository';
import { DepositRepository } from 'src/data/persistence/repositories/deposit.repository';
import { NewDepositDTO } from 'src/presentation/dtos/new-deposit-dto';

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
  createDeposit(deposit: NewDepositDTO): DepositEntity {
    const getAccount = this.accountRepository.findOneById(deposit.account);
    this.accountRepository.addBalance(deposit.account, deposit.amount);
    /*const newAccount = new AccountEntity();
    newAccount.id = deposit.account;
    newAccount.balance = deposit.amount;*/

    const newDeposit = new DepositEntity();
    newDeposit.amount = this.accountRepository.getBalance(deposit.account);
    newDeposit.dateTime = deposit.dateTime;
    //console.log('new Date', new Date('2022-06-01').valueOf());
    newDeposit.account = getAccount;
    //2022-06-01
    console.log('newDeposit ', newDeposit);
    return this.depositRepository.register(newDeposit);
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
    console.log('pagination ', pagination, 'dataRange ', dataRange);
    return this.depositRepository.findByAccountIdAndPagination(
      accountId,
      pagination.limit,
      pagination.offset,
      dataRange?.startDate,
      dataRange?.endDate,
    );
  }
}
