import { Injectable } from '@nestjs/common';
import { NewTransferDTO } from 'src/dtos/new-transfer.dto';
import { TransferModel } from 'src/models';
import { DataRangeModel } from 'src/models/dataRange.model';
import { PaginationModel } from 'src/models/pagination.model';
import { TransferEntity } from 'src/persistence/entities';
import { TransferRepository } from 'src/persistence/repositories/transfer.repository';

@Injectable()
export class TransferService {
  constructor(private readonly transferRepository: TransferRepository) {}
  /**
   * Crear una transferencia entre cuentas del banco
   *
   * @param {TransferModel} transfer
   * @return {*}  {TransferEntity}
   * @memberof TransferService
   */
  createTransfer(transfer: NewTransferDTO): TransferEntity {
    const newTransfer = new TransferEntity();
    //newTransfer.income = transfer.income;
    //newTransfer.outcome = transfer.outcome;
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
    //pagination: PaginationModel,
    //dataRange?: DataRangeModel,
  ): TransferEntity[] {
    throw new Error('This method is not implemented');
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
    //pagination: PaginationModel,
    //dataRange?: DataRangeModel,
  ): TransferEntity[] {
    throw new Error('This method is not implemented');
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
    throw new Error('This method is not implemented');
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
