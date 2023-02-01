import { AccountEntity } from '../entities';
import { RepositoryBase } from './base/repository.base';
import { IAccountRepository } from './interfaces';

export class AccountRepository
  extends RepositoryBase<AccountEntity>
  implements IAccountRepository
{
  findByState(state: boolean): AccountEntity[] {
    throw new Error('Method not implemented.');
  }

  findByCustomer(customerId: string): AccountEntity[] {
    throw new Error('Method not implemented.');
  }

  findByAccountType(accountTypeId: string): AccountEntity[] {
    throw new Error('Method not implemented.');
  }

  register(entity: AccountEntity): AccountEntity {
    throw new Error('Method not implemented.');
  }

  update(id: string, entity: AccountEntity): AccountEntity {
    throw new Error('Method not implemented.');
  }

  delete(id: string, soft?: boolean | undefined): void {
    throw new Error('Method not implemented.');
  }

  findAll(): AccountEntity[] {
    throw new Error('Method not implemented.');
  }

  findOneById(id: string): AccountEntity {
    throw new Error('Method not implemented.');
  }

  /**
   * Borra físicamente una cuenta de la base de datos
   *
   * @private
   * @param {number} index Indice de la cuenta a borrar
   * @memberof CustomerRepository
   */
  private hardDelete(index: number): void {
    throw new Error('This method is not implemented');
  }

  /**
   * Borra lógicamente una cuenta de la base de datos
   *
   * @private
   * @param {number} index Indice de la cuenta a borrar
   * @memberof CustomerRepository
   */
  private softDelete(index: number): void {
    throw new Error('This method is not implemented');
  }
}
