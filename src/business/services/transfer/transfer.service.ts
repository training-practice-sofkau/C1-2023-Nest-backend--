import { Injectable } from '@nestjs/common';
import { TransferEntity } from '../../../data';
import { DateTimeRangeDTO, NewTransferDTO, PaginationDTO } from '../../dtos';

/**
 * Servicio para el manejo de las transferencias entre cuentas del banco
 *
 * @export
 * @class TransferService
 */
@Injectable()
export class TransferService {
  /**
   * Crear una transferencia entre cuentas del banco
   *
   * @param {NewTransferDTO} transfer
   * @return {*}  {TransferEntity}
   * @memberof TransferService
   */
  createTransfer(transfer: NewTransferDTO): TransferEntity {
    throw new Error('This method is not implemented');
  }

  /**
   * Obtener historial de transacciones de salida de una cuenta
   *
   * @param {string} accountId
   * @param {PaginationDTO} pagination
   * @param {DateTimeRangeDTO} [dataRange]
   * @return {*}  {TransferEntity[]}
   * @memberof TransferService
   */
  getHistoryOut(
    accountId: string,
    pagination: PaginationDTO,
    dataRange?: DateTimeRangeDTO,
  ): TransferEntity[] {
    throw new Error('This method is not implemented');
  }

  /**
   * Obtener historial de transacciones de entrada en una cuenta
   *
   * @param {string} accountId
   * @param {PaginationDTO} pagination
   * @param {DateTimeRangeDTO} [dataRange]
   * @return {*}  {TransferEntity[]}
   * @memberof TransferService
   */
  getHistoryIn(
    accountId: string,
    pagination: PaginationDTO,
    dataRange?: DateTimeRangeDTO,
  ): TransferEntity[] {
    throw new Error('This method is not implemented');
  }

  /**
   * Obtener historial de transacciones de una cuenta
   *
   * @param {string} accountId
   * @param {PaginationDTO} pagination
   * @param {DateTimeRangeDTO} [dataRange]
   * @return {*}  {TransferEntity[]}
   * @memberof TransferService
   */
  getHistory(
    accountId: string,
    pagination: PaginationDTO,
    dataRange?: DateTimeRangeDTO,
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
    throw new Error('This method is not implemented');
  }
}
