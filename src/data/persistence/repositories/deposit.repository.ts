import { RepositoryBase } from './base';
import { DepositEntity } from '../entities';
import { IDepositRepository } from './interfaces';

export class DepositRepository
  extends RepositoryBase<DepositEntity>
  implements IDepositRepository
{
  findByAccountId(accountId: string): DepositEntity[] {
    throw new Error('Method not implemented.');
  }

  findByDataRange(
    dateInit: number | Date,
    dateEnd: number | Date,
  ): DepositEntity[] {
    throw new Error('Method not implemented.');
  }

  register(entity: DepositEntity): DepositEntity {
    throw new Error('Method not implemented.');
  }

  update(id: string, entity: DepositEntity): DepositEntity {
    throw new Error('Method not implemented.');
  }

  delete(id: string, soft?: boolean | undefined): void {
    throw new Error('Method not implemented.');
  }

  findAll(): DepositEntity[] {
    throw new Error('Method not implemented.');
  }

  findOneById(id: string): DepositEntity {
    throw new Error('Method not implemented.');
  }

  /**
   * Borra físicamente un deposito de la base de datos
   *
   * @private
   * @param {number} index Indice del deposito a borrar
   * @memberof CustomerRepository
   */
  private hardDelete(index: number): void {
    throw new Error('This method is not implemented');
  }

  /**
   * Borra lógicamente un deposito de la base de datos
   *
   * @private
   * @param {number} index Indice del deposito a borrar
   * @memberof CustomerRepository
   */
  private softDelete(index: number): void {
    throw new Error('This method is not implemented');
  }
}
