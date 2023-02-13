import { Injectable, NotFoundException } from '@nestjs/common';
import { NewAccountDTO } from 'src/presentation/dtos/new-account.dto';
import {
  AccountEntity,
  AccountTypeEntity,
  CustomerEntity,
  DocumentTypeEntity,
} from 'src/data/persistence';
import { AccountRepository } from 'src/data/persistence/repositories/account.repository';
import { AccountTypeRepository } from 'src/data/persistence/repositories/account-type.repository';

@Injectable()
export class AccountService {
  constructor(
    private readonly accountRepository: AccountRepository,
    private readonly accountTypeRepository: AccountTypeRepository,
  ) {}

  findAll(): AccountEntity[] {
    return this.accountRepository.findAll();
  }

  /**
   * Crear una cuenta
   *
   * @param {AccountModel} account
   * @return {*}  {AccountEntity}
   * @memberof AccountService
   */
  createAccount(account: NewAccountDTO): AccountEntity {
    const customer = new CustomerEntity();
    customer.id = account.customer;

    const documentType = new DocumentTypeEntity();
    documentType.id = account.accountType;

    const newAccount = new AccountEntity();
    newAccount.balance = account.balance;

    //crear account type
    //const accountType = new AccountTypeEntity();
    /*const accountType = {
      name: 'corriente',
    };
    const accoType = this.accountTypeRepository.register(accountType);
    newAccount.accountType = accoType;*/
    return this.accountRepository.register(newAccount);
  }

  updatedAccount(id: string, account: NewAccountDTO): AccountEntity {
    const customer = new CustomerEntity();
    customer.id = account.customer;

    const documentType = new DocumentTypeEntity();
    documentType.id = account.accountType;

    const newAccount = new AccountEntity();
    newAccount.balance = account.balance;
    const update = this.accountRepository.update(id, newAccount);
    return update;
  }

  /**
   * Obtener el balance de una cuenta
   *
   * @param {string} accountId
   * @return {*}  {number}
   * @memberof AccountService
   */
  getBalance(accountId: string): number {
    return this.accountRepository.getBalance(accountId);
  }

  /**
   * Agregar balance a una cuenta
   *
   * @param {string} accountId
   * @param {number} amount
   * @memberof AccountService
   */
  addBalance(accountId: string, amount: number): void {
    this.accountRepository.addBalance(accountId, amount);
  }

  /**
   * Remover balance de una cuenta
   *
   * @param {string} accountId
   * @param {number} amount
   * @memberof AccountService
   */
  removeBalance(accountId: string, amount: number): void {
    this.accountRepository.removeBalance(accountId, amount);
  }

  /**
   * Verificar la disponibilidad de un monto a retirar en una cuenta
   *
   * @param {string} accountId
   * @param {number} amount
   * @return {*}  {boolean}
   * @memberof AccountService
   */
  verifyAmountIntoBalance(accountId: string, amount: number): boolean {
    const account = this.accountRepository.findOneById(accountId);
    if (!account) {
      throw new NotFoundException(
        `La cuenta ${account} no existe en base de datos`,
      );
    }
    if (!account.state) {
      throw new NotFoundException(`La cuenta ${account} esta desactivada`);
    }
    if (account.balance >= amount) {
      return true;
    }
    return false;
  }

  /**
   * Obtener el estado de una cuenta
   *
   * @param {string} accountId
   * @return {*}  {boolean}
   * @memberof AccountService
   */
  getState(accountId: string): boolean {
    const account = this.accountRepository.findOneById(accountId);
    if (!account) {
      throw new NotFoundException(
        `La cuenta ${account} no existe en base de datos`,
      );
    }
    if (!account.state) {
      throw new NotFoundException(`La cuenta ${account} esta desactivada`);
    }
    return account.state;
  }

  /**
   * Cambiar el estado de una cuenta
   *
   * @param {string} accountId
   * @param {boolean} state
   * @memberof AccountService
   */
  changeState(accountId: string, state: string): void {
    console.log('state in ser ', state);
    let account = this.accountRepository.findOneById(accountId);
    if (!account) {
      throw new NotFoundException(
        `La cuenta ${account} no existe en base de datos`,
      );
    }
    let booleanState = true;
    if (state === 'false') booleanState = false;
    account = {
      ...account,
      state: booleanState,
    };
    this.accountRepository.update(accountId, account);
  }

  /**
   * Obtener el tipo de cuenta de una cuenta
   *
   * @param {string} accountId
   * @return {*}  {AccountTypeEntity}
   * @memberof AccountService
   */
  getAccountType(accountId: string): AccountTypeEntity {
    const account = this.accountRepository.findOneById(accountId);
    if (!account) {
      throw new NotFoundException(
        `La cuenta ${account} no existe en base de datos`,
      );
    }
    if (!account.state) {
      throw new NotFoundException(`La cuenta ${account} esta desactivada`);
    }
    console.log('account.accountType ', account.accountType);
    return account.accountType;
  }

  /**
   * Cambiar el tipo de cuenta a una cuenta
   *
   * @param {string} accountId
   * @param {string} accountTypeId
   * @return {*}  {AccountTypeEntity}
   * @memberof AccountService
   */
  changeAccountType(
    accountId: string,
    accountTypeId: string,
  ): AccountTypeEntity {
    const account = this.accountRepository.findOneById(accountId);
    if (!account) {
      throw new NotFoundException(
        `La cuenta ${account} no existe en base de datos`,
      );
    }
    if (!account.state) {
      throw new NotFoundException(`La cuenta ${account} esta desactivada`);
    }
    const accountType = this.accountTypeRepository.findOneById(accountTypeId);
    account.accountType = accountType;
    return account.accountType;
  }

  /**
   * Borrar una cuenta
   *
   * @param {string} accountId
   * @memberof AccountService
   */
  deleteAccount(accountId: string): void {
    return this.accountRepository.delete(accountId);
  }

  verifyAccountAndState(accountId: string): object {
    const account = this.accountRepository.findOneById(accountId);
    if (!account) {
      throw new NotFoundException(
        `La cuenta ${account} no existe en base de datos`,
      );
    }
    if (!account.state) {
      throw new NotFoundException(`La cuenta ${account} esta desactivada`);
    }
    return account;
  }
}
