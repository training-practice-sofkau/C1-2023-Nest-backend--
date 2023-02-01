import { RepositoryBase } from './base';
import { TransferEntity } from '../entities';
import { ITransferRepository } from './interfaces';

export class TransferRepository
  extends RepositoryBase<TransferEntity>
  implements ITransferRepository
{
  findOutcomeByDataRange(
    accountId: string,
    dateInit: number | Date,
    dateEnd: number | Date,
  ): TransferEntity[] {
    throw new Error('Method not implemented.');
  }
  findIncomeByDataRange(
    accountId: string,
    dateInit: number | Date,
    dateEnd: number | Date,
  ): TransferEntity[] {
    throw new Error('Method not implemented.');
  }
  register(entity: TransferEntity): TransferEntity {
    throw new Error('Method not implemented.');
  }
  update(id: string, entity: TransferEntity): TransferEntity {
    throw new Error('Method not implemented.');
  }
  delete(id: string, soft?: boolean | undefined): void {
    throw new Error('Method not implemented.');
  }
  findAll(): TransferEntity[] {
    throw new Error('Method not implemented.');
  }
  findOneById(id: string): TransferEntity {
    throw new Error('Method not implemented.');
  }

  /**
   * Borra físicamente una transferencia de la base de datos
   *
   * @private
   * @param {number} index Indice de la transferencia a borrar
   * @memberof CustomerRepository
   */
  private hardDelete(index: number): void {
    throw new Error('This method is not implemented');
  }

  /**
   * Borra lógicamente una transferencia de la base de datos
   *
   * @private
   * @param {number} index Indice de la transferencia a borrar
   * @memberof CustomerRepository
   */
  private softDelete(index: number): void {
    throw new Error('This method is not implemented');
  }
}
