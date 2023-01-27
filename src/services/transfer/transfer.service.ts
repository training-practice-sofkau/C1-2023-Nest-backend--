import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { TransferModel } from "src/models";
import { TransferEntity } from "src/persistence/entities";
import { TransferRespository } from "src/persistence/repositories/transfer.repository";
import { AccountService } from "../account";

@Injectable()
export class TransferService {

    constructor(private readonly transferRepository: TransferRespository, private readonly accountService: AccountService) { }
    /**
   * Crear una transferencia entre cuentas del banco
   *
   * @param {TransferModel} transfer
   * @return {*}  {TransferEntity}
   * @memberof TransferService
   */
    createTransfer(transfer: TransferModel): TransferEntity {
        const incomeAccount = this.accountService.getState(transfer.income.id)
        const outcomeAccount = this.accountService.getState(transfer.outcome.id)
        if (incomeAccount && outcomeAccount) {
            if (this.accountService.getBalance(transfer.outcome.id) >= transfer.amount) {
                return this.transferRepository.register(transfer)
            }
            else {
                throw new InternalServerErrorException()
            }
        }
        else {
            throw new InternalServerErrorException()
        }
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
        pagination: PaginationModel,
        dataRange?: DataRangeModel,
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
        const transfer = this.transferRepository.findOneById(transferId)
        if (transfer.deletedAt === undefined) {
            this.transferRepository.delete(transferId, true)
        }
        else {
            this.transferRepository.delete(transferId, false)
        }

    }
}