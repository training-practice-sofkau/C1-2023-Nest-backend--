import { Injectable } from '@nestjs/common';
import { CustomerEntity } from '../entities';
import { RepositoryBase } from './base';
import { ICustomerRepository } from './interfaces';

@Injectable()
export class CustomerRepository
  extends RepositoryBase<CustomerEntity>
  implements ICustomerRepository
{
  findOneByEmailAndPassword(email: string, password: string): boolean {
    throw new Error('Method not implemented.');
  }

  findOneByDocumentTypeAndDocument(
    documentTypeId: string,
    document: string,
  ): CustomerEntity {
    throw new Error('Method not implemented.');
  }

  findOneByEmail(email: string): CustomerEntity {
    throw new Error('Method not implemented.');
  }

  findOneByPhone(phone: string): CustomerEntity {
    throw new Error('Method not implemented.');
  }

  findByState(state: boolean): CustomerEntity[] {
    throw new Error('Method not implemented.');
  }

  findByFullName(fullName: string): CustomerEntity[] {
    throw new Error('Method not implemented.');
  }

  register(entity: CustomerEntity): CustomerEntity {
    throw new Error('Method not implemented.');
  }

  update(id: string, entity: CustomerEntity): CustomerEntity {
    throw new Error('Method not implemented.');
  }

  delete(id: string, soft?: boolean | undefined): void {
    throw new Error('Method not implemented.');
  }

  findAll(): CustomerEntity[] {
    throw new Error('Method not implemented.');
  }

  findOneById(id: string): CustomerEntity {
    throw new Error('Method not implemented.');
  }

  /**
   * Borra físicamente un cliente de la base de datos
   *
   * @private
   * @param {number} index Indice del cliente a borrar
   * @memberof CustomerRepository
   */
  private hardDelete(index: number): void {
    throw new Error('This method is not implemented');
  }

  /**
   * Borra lógicamente un cliente de la base de datos
   *
   * @private
   * @param {number} index Indice del cliente a borrar
   * @memberof CustomerRepository
   */
  private softDelete(index: number): void {
    throw new Error('This method is not implemented');
  }
}
