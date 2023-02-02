import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { TransferModel } from "src/models";
import { DataRangeModel } from "src/models/data-range.model";
import { PaginationModel } from "src/models/pagination.model";
import { TransferEntity } from "src/persistence/entities/transfer.entity";
import { TransferReoisitory } from "src/persistence/repositories";
import { AccountService } from "../account/account.service";

@Injectable()
export class TransferService {
  constructor(
    private readonly transferRepository: TransferReoisitory,
    private readonly accountService: AccountService,
  ) {}

  //Registra la transferancia en el sistema y actualiza el balance en las cuentas afectadas
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

  //Devuelve historial de transferencias con cuenta de entrada enviada junto a paginacion y rangos
  async getHistoryOut(
    accountId: string,
    pagination: PaginationModel,
    dataRange?: DataRangeModel,
  ): Promise<TransferEntity[]> {
    const currentTransfers =
      this.transferRepository.findByOutcomeId(accountId);
    return this.historyPagination(currentTransfers, pagination, dataRange);
  }

  //Devuelve historial de transferencias con cuenta de salida enviada junto a paginacion y rangos
  async getHistoryIn(
    accountId: string,
    pagination: PaginationModel,
    dataRange?: DataRangeModel,
  ): Promise<TransferEntity[]> {
    const currentTransfers =
      this.transferRepository.findByIncomeId(accountId);
    return this.historyPagination(currentTransfers, pagination, dataRange);
  }

  //Devuelve todas las transferencias realizadas segun paginacion y rango
  getHistory(
    accountId: string,
    pagination: PaginationModel,
    dataRange?: DataRangeModel,
  ): TransferEntity[] {
    const currentTransfersOut =
      this.transferRepository.findByOutcomeId(accountId);
    const currentTransfersIn =
      this.transferRepository.findByIncomeId(accountId);
    const currentTransfers = [...currentTransfersIn, ...currentTransfersOut];
    return this.historyPagination(currentTransfers, pagination, dataRange);
  }

  //Borrado de la transferencia enviada
  deleteTransfer(transferId: string): void {
    this.transferRepository.delete(transferId, true);
  }

  //Metodo generico para paginacion
  private historyPagination(transfersList: TransferEntity[], pagination: PaginationModel, dataRange?: DataRangeModel): TransferEntity[] {
    const transfers: TransferEntity[] = [];
    let range = dataRange && dataRange.range > 0 ? dataRange.range : 10;
    pagination.numberPages = Math.ceil(transfersList.length / range);
    const start = (pagination.actualPage - 1) * range;
    const end = start + range;
    for (let i = start; i < end && i < transfersList.length; i++) {
      transfers.push(transfersList[i]);
    }
    return transfers;
  }
  
}