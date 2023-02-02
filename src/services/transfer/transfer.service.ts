import { Injectable } from '@nestjs/common';
import { DataRangeModel, PaginationModel, TransferModel } from 'src/models';
import { TransferEntity } from 'src/persistence/entities';
import { TransferRepository } from '../../persistence/repositories';
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
  createTransfer(transfer: TransferModel): TransferModel {
    const newTransfer = new TransferEntity();
    newTransfer.outCome = transfer.outCome;
    newTransfer.outCome = transfer.outCome;
    newTransfer.amount = transfer.amount;
    newTransfer.reason = transfer.reason;

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
    if (dataRange) {
      const array = this.transferRepository.findOutcomeByDataRange(
        accountId,
        dataRange.start,
        dataRange.end,
      );
      const arrayReturn = [];
      for (let i = 0; i < array.length; i += 10) {
        arrayReturn.push(array.slice(i, i + 10));
      }
      return arrayReturn[pagination.page];
    }
    const array = this.transferRepository
      .findAll()
      .filter((item) => item.outCome.id === accountId);
    return array;
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
    if (dataRange) {
      const array = this.transferRepository.findIncomeByDataRange(
        accountId,
        dataRange.start,
        dataRange.end,
      );
      const arrayReturn = [];
      for (let i = 0; i < array.length; i += 10) {
        arrayReturn.push(array.slice(i, i + 10));
      }
      return arrayReturn[pagination.page];
    }
    const array = this.transferRepository
      .findAll()
      .filter((item) => item.outCome.id === accountId);
    return array;
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
    if (dataRange) {
      const array = this.transferRepository.findAll();
      const arrayReturn = [];
      for (let i = 0; i < array.length; i += 10) {
        arrayReturn.push(array.slice(i, i + 10));
      }
      return arrayReturn[pagination.page];
    }
    const array = this.transferRepository
      .findAll()
      .filter((item) => item.outCome.id === accountId);
    return array;
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
