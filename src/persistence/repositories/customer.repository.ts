import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CustomerEntity } from '../entities';
import { BaseRepository } from './base';
import { CustomerRepositoryInterface } from './interfaces';

@Injectable()
export class CustomerRepository
  extends BaseRepository<CustomerEntity>
  implements CustomerRepositoryInterface
{
  findOneByEmailAndPassword(email: string, password: string): boolean {
    const currentCustomer = this.findAll().find(
      (c) =>
        c.email.toLowerCase() === email.toLowerCase() &&
        c.password === password,
    );
    if (currentCustomer) {
      return true;
    }
    return false;
  }

  findOneByDocumentTypeAndDocument(
    documentTypeId: string,
    document: string,
  ): CustomerEntity {
    const currentCustomer = this.findAll().find(
      (c) => c.documentType.id === documentTypeId && c.document === document,
    );
    if (currentCustomer) {
      return currentCustomer;
    }
    throw new NotFoundException(
      `No existe cliente con el numero de documento: ${document}`,
    );
  }

  findOneByEmail(email: string): CustomerEntity {
    const currentCustomer = this.findAll().find(
      (c) => c.email.toLowerCase() === email.toLowerCase(),
    );
    if (currentCustomer) {
      return currentCustomer;
    }
    throw new NotFoundException(`No existe cliente con el email: ${email}`);
  }

  findOneByPhone(phone: string): CustomerEntity {
    const currentCustomer = this.findAll().find(
      (c) => c.phone.toLowerCase() === phone.toLowerCase(),
    );
    if (currentCustomer) {
      return currentCustomer;
    }
    throw new NotFoundException(
      `No existe cliente con el número de teléfono: ${phone}`,
    );
  }

  findByState(state: boolean): CustomerEntity[] {
    const currentCustomers = this.findAll().filter((c) => c.state === state);
    if (currentCustomers.length == 0) {
      throw new NotFoundException(
        `No hay clientes en estado ${state ? 'activo' : 'inactivo'}`,
      );
    }
    return currentCustomers;
  }

  findByFullName(fullName: string): CustomerEntity[] {
    const currentCustomers = this.findAll().filter(
      (c) => c.fullName.toLowerCase().indexOf(fullName.toLowerCase()) !== -1,
    );
    if (currentCustomers.length == 0) {
      throw new NotFoundException(
        `No hay clientes con el nombre:  ${fullName}`,
      );
    }
    return currentCustomers;
  }

  register(entity: CustomerEntity): CustomerEntity {
    const currentCustomers = this.findAll().find((i) => i.id === entity.id);
    if (currentCustomers) {
      throw new ConflictException(
        'El cliente que intenta registrar ya existe en la base de datos',
      );
    } else {
      this.database.push(entity);
    }
    return this.database.at(-1) ?? entity;
  }

  upate(id: string, entity: CustomerEntity): CustomerEntity {
    const currentCustomer = this.findOneById(id);
    if (currentCustomer === entity) {
      throw new ConflictException('Los datos a actualizar ya existen');
    }
    const index = this.database.findIndex((i) => i.id === id);
    this.database[index] = {
      ...currentCustomer,
      ...entity,
      id: id,
    };
    return this.database[index];
  }

  delete(id: string, soft?: boolean | undefined): void {
    const currentAccount = this.findOneById(id);
    const index = this.database.findIndex((i) => i.id === id);
    if (soft && currentAccount) {
      this.softDelete(index);
    }
    this.hardDelete(index);
  }

  private hardDelete(index: number): void {
    this.database.slice(index, 1);
  }

  private softDelete(index: number): void {
    const currentCustomer = this.database[index];
    currentCustomer.deletedAt = Date.now();
    this.upate(currentCustomer.id, currentCustomer);
  }

  findAll(): CustomerEntity[] {
    return this.database.filter((c) => c.deletedAt === undefined);
  }

  findOneById(id: string): CustomerEntity {
    const currentCustomer = this.findAll().find((a) => a.id === id);
    if (currentCustomer) {
      return currentCustomer;
    } else {
      throw new NotFoundException(
        `El cliente con el Id ${id} no existe en la base de datos`,
      );
    }
  }
}
