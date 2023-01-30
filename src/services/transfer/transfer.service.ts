import { Injectable } from '@nestjs/common';
import { DataRangeModel, PaginationModel, TransferModel } from 'src/models';
import { TransferEntity } from 'src/persistence/entities';
import { TransferRepository } from 'src/persistence/repositories';
import { AccountService } from '../account';

@Injectable()
export class TransferService {
  constructor(
    private readonly transferRepository: TransferRepository,
    private readonly accountService: AccountService,
  ) {}

  createTransfer(transfer: TransferModel): TransferEntity {
    const newTransfer = new TransferEntity();
    newTransfer.amount = transfer.amount;
    newTransfer.dateTime = Date.now();
    newTransfer.income = transfer.income;
    newTransfer.outcome = transfer.outcome;
    newTransfer.reason = transfer.reason;
    this.transferRepository.register(newTransfer);
    this.accountService.addBalance(transfer.income.id, transfer.amount);
    this.accountService.removeBalance(transfer.outcome.id, transfer.amount);
    return newTransfer;
  }

  async getHistoryOut(
    accountId: string,
    pagination: PaginationModel,
    dataRange?: DataRangeModel,
  ): Promise<TransferEntity[]> {
    const currentTransfers =
      this.transferRepository.findByOutcomeAccount(accountId);
    pagination.size = currentTransfers.length;
    return this.historyPagination(currentTransfers, pagination, dataRange);
  }

  async getHistoryIn(
    accountId: string,
    pagination: PaginationModel,
    dataRange?: DataRangeModel,
  ): Promise<TransferEntity[]> {
    const currentTransfers =
      this.transferRepository.findByIncomeAccount(accountId);
    return this.historyPagination(currentTransfers, pagination, dataRange);
  }

  getHistory(
    accountId: string,
    pagination: PaginationModel,
    dataRange?: DataRangeModel,
  ): TransferEntity[] {
    const currentTransfersOut =
      this.transferRepository.findByOutcomeAccount(accountId);
    const currentTransfersIn =
      this.transferRepository.findByIncomeAccount(accountId);
    const currentTransfers = [...currentTransfersIn, ...currentTransfersOut];
    return this.historyPagination(currentTransfers, pagination, dataRange);
  }

  deleteTransfer(transferId: string): void {
    this.transferRepository.delete(transferId, true);
  }

  private historyPagination(
    transfersList: TransferEntity[],
    pagination: PaginationModel,
    dataRange?: DataRangeModel,
  ): TransferEntity[] {
    const transfers: TransferEntity[] = [];
    let range = 0;
    if (dataRange && dataRange.range > 0) {
      range = dataRange.range;
    } else {
      range = 10;
    }
    pagination.pages = Math.round(pagination.size / range);
    for (
      let i = pagination.currentPage * range - range;
      i < pagination.currentPage * range;
      i++
    ) {
      transfers.push(transfersList[i]);
    }
    return transfers;
  }
}
