import { Injectable } from '@nestjs/common';
import { TransferModel } from 'src/models';
import { TransferEntity } from 'src/persistence/entities';
import { TransferRepository } from 'src/persistence/repositories';

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
  createTransfer(transfer: TransferModel): TransferEntity {
    const transferNew = new TransferEntity();
    transferNew.outCome = transfer.outCome;
    transferNew.amount = transfer.amount;
    return this.transferRepository.register(transferNew);
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
  // getHistoryOut(
  //   accountId: string,
  //   pagination: PaginationModel,
  //   dataRange?: DataRangeModel,
  // ): TransferEntity[] {
  //   throw new Error('This method is not implemented');
  // }

  // /**
  //  * Obtener historial de transacciones de entrada en una cuenta
  //  *
  //  * @param {string} accountId
  //  * @param {PaginationModel} pagination
  //  * @param {DataRangeModel} [dataRange]
  //  * @return {*}  {TransferEntity[]}
  //  * @memberof TransferService
  //  */
  // getHistoryIn(
  //   accountId: string,
  //   pagination: PaginationModel,
  //   dataRange?: DataRangeModel,
  // ): TransferEntity[] {
  //   throw new Error('This method is not implemented');
  // }

  // /**
  //  * Obtener historial de transacciones de una cuenta
  //  *
  //  * @param {string} accountId
  //  * @param {PaginationModel} pagination
  //  * @param {DataRangeModel} [dataRange]
  //  * @return {*}  {TransferEntity[]}
  //  * @memberof TransferService
  //  */
  // getHistory(
  //   accountId: string,
  //   pagination: PaginationModel,
  //   dataRange?: DataRangeModel,
  // ): TransferEntity[] {
  //   throw new Error('This method is not implemented');
  // }

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
