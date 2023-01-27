import { Injectable } from '@nestjs/common';
import { TransferModel } from 'src/models';
import { TransferEntity } from 'src/persistence/entities';
import { AccountRepository, AccountTypeRepository, TransferRepository } from 'src/persistence/repositories';
import { AccountService } from '../account';

@Injectable()
export class TransferService {
  constructor(
    private readonly accountRepository: AccountRepository,
    private readonly accountTypeRepository: AccountTypeRepository,
    private readonly transferRepository: TransferRepository,
    private readonly accountService: AccountService,
  ) { }

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
  ): TransferEntity[] { }

  async getHistoryOut(
    accountId: string,
    pagination: PaginationModel,
    dataRange?: DataRangeModel,
  ): TransferEntity[] { }

  getHistory(
    accountId: string,
    pagination: PaginationModel,
    dataRange?: DataRangeModel,
  ): TransferEntity[] { }

  deleteTransfer(transferId: string): void {
    this.transferRepository.delete(transferId, true);
  }
}
