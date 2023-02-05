import { Injectable } from '@nestjs/common';
import { DataRangeModel } from 'src/data/models/dataRange.model';
import { PaginationModel } from 'src/data/models/pagination.model';
import { AccountEntity, TransferEntity } from 'src/data/persistence';
import { AccountRepository } from 'src/data/persistence/repositories/account.repository';
import { TransferRepository } from 'src/data/persistence/repositories/transfer.repository';
import { NewTransferDTO } from 'src/presentation/dtos/new-transfer.dto';

@Injectable()
export class TransferService {
  constructor(
    private readonly transferRepository: TransferRepository,
    private readonly accountRepository: AccountRepository,
  ) {}
  /**
   * Crear una transferencia entre cuentas del banco
   *
   * @param {TransferModel} transfer
   * @return {*}  {TransferEntity}
   * @memberof TransferService
   */
  createTransfer(transfer: NewTransferDTO): TransferEntity {
    const getAccountIncome = this.accountRepository.findOneById(
      transfer.income,
    );
    const getAccountOutcome = this.accountRepository.findOneById(
      transfer.outcome,
    );
    /*const newAccountIncome = new AccountEntity();
    newAccountIncome.id = transfer.income;
    const newAccountOutcome = new AccountEntity();
    newAccountOutcome.id = transfer.outcome;*/

    const newTransfer = new TransferEntity();
    newTransfer.amount = transfer.amount;
    newTransfer.dateTime = transfer.dateTime;
    newTransfer.reason = transfer.reason;
    newTransfer.income = getAccountIncome;
    newTransfer.outcome = getAccountOutcome;
    return this.transferRepository.register(newTransfer);
  }

  /**
   * Obtener historial de transacciones de salida de una cuenta
   *
   * @param {string} accountId
   * @param {PaginationModel} pagination
   * @param {DataRangeModel} [dataRange]
   * @return {*}  {TransferEntity[]}
   * @memberof TransferService
   */
  getHistoryOut(
    accountId: string,
    pagination: PaginationModel,
    dataRange?: DataRangeModel,
  ): TransferEntity[] {
    return this.transferRepository.findOutcomeByAccountIdAndPagination(
      accountId,
      pagination.limit,
      pagination.offset,
      dataRange?.startDate,
      dataRange?.endDate,
    );
  }

  /**
   * Obtener historial de transacciones de entrada en una cuenta
   *
   * @param {string} accountId
   * @param {PaginationModel} pagination
   * @param {DataRangeModel} [dataRange]
   * @return {*}  {TransferEntity[]}
   * @memberof TransferService
   */
  getHistoryIn(
    accountId: string,
    pagination: PaginationModel,
    dataRange?: DataRangeModel,
  ): TransferEntity[] {
    return this.transferRepository.findIncomeByAccountIdAndPagination(
      accountId,
      pagination.limit,
      pagination.offset,
      dataRange?.startDate,
      dataRange?.endDate,
    );
  }

  /**
   * Obtener historial de transacciones de una cuenta
   *
   * @param {string} accountId
   * @param {PaginationModel} pagination
   * @param {DataRangeModel} [dataRange]
   * @return {*}  {TransferEntity[]}
   * @memberof TransferService
   */
  getHistory(
    accountId: string,
    pagination: PaginationModel,
    dataRange?: DataRangeModel,
  ): TransferEntity[] {
    return this.transferRepository.findTransferByAccountIdAndPagination(
      accountId,
      pagination.limit,
      pagination.offset,
      dataRange?.startDate,
      dataRange?.endDate,
    );
  }

  /**
   * Borrar una transacción
   *
   * @param {string} transferId
   * @memberof TransferService
   */
  deleteTransfer(transferId: string): void {
    this.transferRepository.delete(transferId);
  }
}
