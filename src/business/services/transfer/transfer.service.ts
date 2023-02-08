import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { CreateTransferDto } from 'src/business/dtos';
import { DateRangeModel, PaginationModel } from 'src/data/models';
import { TransferEntity } from 'src/data/persistence/entities';
import { TransferRepository } from 'src/data/persistence/repositories';
import { AccountService } from '../account';
import { UnauthorizedException } from '@nestjs/common/exceptions';

@Injectable()
export class TransferService {
  constructor(
    private readonly transferRepository: TransferRepository,
    private readonly accountService: AccountService,
  ) {}

  //Retorna todas las transferencias registradas en el sistema
  getAll(): TransferEntity[] {
    return this.transferRepository.findAll();
  }

  getHistoryByCustomer(
    customerId: string,
    pagination: PaginationModel,
    dateRange?: DateRangeModel,
  ): TransferEntity[] {
    const accounts = this.accountService.getAccountsByCustomer(customerId);
    const totalTransfers: TransferEntity[] = [];
    for (const account of accounts) {
      totalTransfers.push(
        ...this.getHistory(account.id, pagination, dateRange),
      );
    }
    return totalTransfers;
  }

  getHistoryOutByCustomer(
    customerId: string,
    pagination: PaginationModel,
    dateRange?: DateRangeModel,
  ): TransferEntity[] {
    const accounts = this.accountService.getAccountsByCustomer(customerId);
    const totalTransfers: TransferEntity[] = [];
    for (const account of accounts) {
      totalTransfers.push(
        ...this.getHistoryOut(account.id, pagination, dateRange),
      );
    }
    return totalTransfers;
  }

  getHistoryInByCustomer(
    customerId: string,
    pagination: PaginationModel,
    dateRange?: DateRangeModel,
  ): TransferEntity[] {
    const accounts = this.accountService.getAccountsByCustomer(customerId);
    const totalTransfers: TransferEntity[] = [];
    for (const account of accounts) {
      totalTransfers.push(
        ...this.getHistoryIn(account.id, pagination, dateRange),
      );
    }
    return totalTransfers;
  }
  //Registra la transferancia en el sistema y actualiza el balance en las cuentas afectadas
  createTransfer(
    customerId: string,
    transfer: CreateTransferDto,
  ): TransferEntity {
    const incomeAccount = this.accountService.getAccountById(
      customerId,
      transfer.incomeId,
    );
    const outcomeAccount = this.accountService.getAccountById(
      customerId,
      transfer.outcomeId,
    );
    const newTransfer = new TransferEntity();
    newTransfer.amount = transfer.amount;
    newTransfer.dateTime = Date.now();
    newTransfer.income = incomeAccount;
    newTransfer.outcome = outcomeAccount;
    newTransfer.reason = transfer.reason;
    if (outcomeAccount.balance >= transfer.amount) {
      this.transferRepository.register(newTransfer);
      this.accountService.addBalance(incomeAccount.id, transfer.amount);
      this.accountService.removeBalance(outcomeAccount.id, transfer.amount);
      newTransfer.income = this.accountService.getAccountById(
        customerId,
        transfer.incomeId,
      );
      newTransfer.outcome = this.accountService.getAccountById(
        customerId,
        transfer.outcomeId,
      );
      return newTransfer;
    }
    throw new ConflictException('Saldo insuficiente');
  }

  //Devuelve historial de transferencias con cuenta de entrada enviada junto a paginacion y rangos
  getHistoryOut(
    accountId: string,
    pagination: PaginationModel,
    dateRange?: DateRangeModel,
  ): TransferEntity[] {
    const currentTransfers =
      this.transferRepository.findByOutcomeAccount(accountId);
    if (dateRange) {
      const transfersDateRange = this.getTransfersDateRange(
        currentTransfers,
        dateRange,
      );
      return this.historyPagination(transfersDateRange, pagination);
    }
    return this.historyPagination(currentTransfers, pagination);
  }

  //Devuelve historial de transferencias con cuenta de salida enviada junto a paginacion y rangos
  getHistoryIn(
    accountId: string,
    pagination: PaginationModel,
    dateRange?: DateRangeModel,
  ): TransferEntity[] {
    const currentTransfers =
      this.transferRepository.findByIncomeAccount(accountId);
    if (dateRange) {
      const transfersDateRange = this.getTransfersDateRange(
        currentTransfers,
        dateRange,
      );
      return this.historyPagination(transfersDateRange, pagination);
    }
    return this.historyPagination(currentTransfers, pagination);
  }

  //Devuelve todas las transferencias realizadas segun paginacion y rango
  getHistory(
    accountId: string,
    pagination: PaginationModel,
    dateRange?: DateRangeModel,
  ): TransferEntity[] {
    const currentTransfersOut =
      this.transferRepository.findByOutcomeAccount(accountId);
    const currentTransfersIn =
      this.transferRepository.findByIncomeAccount(accountId);
    const currentTransfers = [...currentTransfersIn, ...currentTransfersOut];
    if (dateRange) {
      const transfersDateRange = this.getTransfersDateRange(
        currentTransfers,
        dateRange,
      );
      return this.historyPagination(transfersDateRange, pagination);
    }
    return this.historyPagination(currentTransfers, pagination);
  }

  //Borrado de la transferencia enviada
  deleteTransfer(customerId: string, transferId: string): void {
    if (
      this.transferRepository.findOneById(transferId).outcome.customer.id !==
      customerId
    ) {
      throw new UnauthorizedException(
        'La transferencia a eliminar no pertenece al cliente',
      );
    }
    this.transferRepository.delete(transferId, true);
  }

  //Metodo generico para paginacion
  private historyPagination(
    transfersList: TransferEntity[],
    pagination: PaginationModel,
  ): TransferEntity[] {
    const currentPage = pagination?.currentPage ?? 1;
    const range = pagination?.range ?? 10;
    const transfers: TransferEntity[] = [];
    const start = currentPage * range - range;
    const end = start + range;
    for (let i = start; i < end; i++) {
      transfersList[i] ? transfers.push(transfersList[i]) : (i = end);
    }
    return transfers;
  }

  //retorna el array con el filtro de fechas
  private getTransfersDateRange(
    transfers: TransferEntity[],
    dateRange: DateRangeModel,
  ): TransferEntity[] {
    const dateInit = dateRange.dateInit ?? new Date('1999-01-01').getTime();
    const dateEnd = dateRange.dateEnd ?? Date.now();
    const transfersDateRange = transfers.filter(
      ({ dateTime }) => dateTime >= dateInit && dateTime <= dateEnd,
    );
    return transfersDateRange;
  }
}
