import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { NewTransferDTO } from 'src/business/dtos';
import { DataRangeModel } from 'src/data/models/data-range.model';
import { PaginationModel } from 'src/data/models/pagination.model';

import { TransferEntity } from 'src/data/persistence/entities';
import { TransferRepository } from 'src/data/persistence/repository';
import { AccountService } from '../account';

@Injectable()
export class TransferService {
  constructor(
    private readonly transferRepository: TransferRepository,
    private readonly accountService: AccountService,
  ) {}

  findAll(): TransferEntity[] {
    return this.transferRepository.findAll();
  }
  findOneById(id: string): TransferEntity {
    const findTransfer = this.transferRepository.findOneById(id);
    if (findTransfer) {
      return findTransfer;
    } else {
      throw new NotFoundException('No existe la Transferencia con ese ID');
    }
  }
  /**
   * Crear una transferencia entre cuentas del banco
   *
   * @param {TransferModel} transfer
   * @return {*}  {TransferEntity}
   * @memberof TransferService
   */
  createTransfer(transfer: NewTransferDTO): TransferEntity {
    const newTransfer = new TransferEntity();
    const newOutcome = this.accountService.findOneById(transfer.outcome);
    const newIncome = this.accountService.findOneById(transfer.income);
    const incomeAccount = this.accountService.getState(transfer.income);
    const outcomeAccount = this.accountService.getState(transfer.outcome);
    if (incomeAccount && outcomeAccount) {
      if (this.accountService.getBalance(transfer.outcome) >= transfer.amount) {
        newTransfer.outcome = newOutcome;
        newTransfer.income = newIncome;
        newTransfer.amount = transfer.amount;
        newTransfer.reason = transfer.reason;
        newTransfer.dateTime = Date.now();
        this.accountService.addBalance(newIncome.id, transfer.amount);
        this.accountService.removeBalance(newOutcome.id, transfer.amount);
        return this.transferRepository.register(newTransfer);
      } else {
        throw new InternalServerErrorException();
      }
    } else {
      throw new InternalServerErrorException();
    }
  }
  getHistoryOut(
    accountId: string,
    pagination: PaginationModel,
    dataRange?: DataRangeModel,
  ): TransferEntity[] {
    const arrayTransfer = this.transferRepository.findByOutcomeId(accountId);
    const arrayTransferReturn: TransferEntity[] = [];
    let range = 0;
    pagination.size = arrayTransfer.length;
    if (dataRange?.range === undefined) {
      range = 10;
    } else {
      range = dataRange.range;
    }
    pagination.numberPages = Math.round(pagination.size / range);
    for (
      let x = 1 + range * (pagination.actualPage - 1);
      x < 1 + range + range * (pagination.actualPage - 1);
      x++
    ) {
      arrayTransferReturn.push(arrayTransfer[x - 1]);
    }
    return arrayTransferReturn;
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
    const arrayTransfer = this.transferRepository.findByIncomeId(accountId);
    const arrayTransferReturn: TransferEntity[] = [];
    let range = 0;
    pagination.size = arrayTransfer.length;
    if (dataRange?.range === undefined) {
      range = 10;
    } else {
      range = dataRange.range;
    }
    pagination.numberPages = Math.round(pagination.size / range);
    for (
      let x = 1 + range * (pagination.actualPage - 1);
      x < 1 + range + range * (pagination.actualPage - 1);
      x++
    ) {
      arrayTransferReturn.push(arrayTransfer[x - 1]);
    }
    return arrayTransferReturn;
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
    const arrayTransfer = this.transferRepository.findByDateRange(
      accountId,
      0,
      Date.now(),
    );
    const arrayTransferReturn: TransferEntity[] = [];
    let range = 0;
    pagination.size = arrayTransfer.length;
    if (dataRange?.range === undefined) {
      range = 10;
    } else {
      range = dataRange.range;
    }
    pagination.numberPages = Math.round(pagination.size / range);
    for (
      let x = 1 + range * (pagination.actualPage - 1);
      x < 1 + range + range * (pagination.actualPage - 1);
      x++
    ) {
      arrayTransferReturn.push(arrayTransfer[x - 1]);
    }
    return arrayTransferReturn;
  }

  /**
   * Borrar una transacción
   *
   * @param {string} transferId
   * @memberof TransferService
   */
  deleteTransfer(transferId: string): void {
    const transfer = this.transferRepository.findOneById(transferId);
    if (transfer.deletedAt === undefined) {
      this.transferRepository.delete(transferId, true);
    } else {
      this.transferRepository.delete(transferId, false);
    }
  }
}
