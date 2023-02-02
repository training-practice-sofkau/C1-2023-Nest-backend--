import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { CreateTransferDto } from 'src/business';
import {
  DateRangeModel,
  PaginationModel,
  TransferEntity,
  TransferRepository,
} from 'src/data';
import { AccountService } from '../account';

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

  //Registra la transferancia en el sistema y actualiza el balance en las cuentas afectadas
  createTransfer(transfer: CreateTransferDto): TransferEntity {
    const incomeAccount = this.accountService.getAccountById(transfer.incomeId);
    const outcomeAccount = this.accountService.getAccountById(
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
        transfer.incomeId,
      );
      newTransfer.outcome = this.accountService.getAccountById(
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
  deleteTransfer(transferId: string): void {
    this.transferRepository.delete(transferId, true);
  }

  //Metodo generico para paginacion
  private historyPagination(
    transfersList: TransferEntity[],
    pagination: PaginationModel,
  ): TransferEntity[] {
    const currentPage = pagination?.currentPage ?? 1;
    const range = Math.round(transfersList.length / pagination?.pages ?? 10);
    if (range < currentPage) {
      throw new BadRequestException(
        `La pagina ${currentPage} no existe o está vacía`,
      );
    }
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
    const dateInit = dateRange.dateEnd ?? new Date('1999-01-01').getTime();
    const dateEnd = dateRange.dateEnd ?? Date.now();
    const transfersDateRange = transfers.filter(
      ({ dateTime }) => dateTime >= dateInit && dateTime <= dateEnd,
    );
    return transfersDateRange;
  }
}
