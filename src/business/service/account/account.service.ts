import { Injectable } from '@nestjs/common';
import { NewAccountDto } from 'src/business/dtos';
import {
  AccountEntity,
  AccountTypeEntity,
} from 'src/data/persistence/entities';
import {
  AccountRepository,
  AccountTypeRepository,
  CustomerRepository,
} from 'src/data/persistence/repository';

@Injectable()
export class AccountService {
  constructor(
    private readonly accountRepository: AccountRepository,
    private readonly accountTypeRepository: AccountTypeRepository,
    private readonly customerRepository: CustomerRepository,
  ) {}

  newmap(account: NewAccountDto): AccountEntity {
    const account1 = new AccountEntity();
    account1.customer = this.customerRepository.findOneById(
      account.CustomerEntityId,
    );
    account1.accountType = this.accountTypeRepository.findOneById(
      account.accontType,
    );
    account1.balance = Number(account.balance);
    return account1;
  }
  /**
   * Crear una cuenta
   *
   * @param {AccountModel} account
   * @return {*}  {AccountEntity}
   * @memberof AccountService
   */
  createAccount(account: NewAccountDto): AccountEntity {
    const newAccount = this.newmap(account);
    return this.accountRepository.register(newAccount);
  }

  /**
   * Obtener el balance de una cuenta
   *
   * @param {string} accountId
   * @return {*}  {number}
   * @memberof AccountService
   */
  getBalance(accountId: string): number {
    return this.accountRepository.findOneById(accountId).balance;
  }

  /**
   * Agregar balance a una cuenta
   *
   * @param {string} accountId
   * @param {number} amount
   * @memberof AccountService
   */
  addBalance(accountId: string, amount: number): number {
    return (this.accountRepository.findOneById(accountId).balance += amount); //se va asuma el monto al balance
  }

  /**
   * Remover balance de una cuenta
   *
   * @param {string} accountId
   * @param {number} amount
   * @memberof AccountService
   */
  removeBalance(accountId: string, amount: number): void {
    if (this.verifyAmountIntoBalance(accountId, amount)) {
      this.accountRepository.findOneById(accountId).balance -= amount;
    } else {
      throw new Error(
        'El valor que desea retirar no puede ser mayor al saldo que tiene en su cuenta',
      );
    }
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
    if (this.accountRepository.findOneById(accountId).balance >= amount) {
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
    return this.accountRepository.findOneById(accountId).state;
  }
  /**
   * Cambiar el estado de una cuenta
   *
   * @param {string} accountId
   * @param {boolean} state
   * @memberof AccountService
   */
  changeState(accountId: string, state: boolean): void {
    this.accountRepository.findOneById(accountId).state = state;
  }

  /**
   * Obtener el tipo de cuenta de una cuenta
   *
   * @param {string} accountId
   * @return {*}  {AccountTypeEntity}
   * @memberof AccountService
   */
  getAccountType(accountId: string): AccountTypeEntity {
    let account2 = new AccountTypeEntity();
    account2 = this.accountRepository.findOneById(accountId).accountType;
    return account2;
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
    const accountchange = this.accountRepository.findOneById(accountId);
    accountchange.accountType =
      this.accountTypeRepository.findOneById(accountTypeId);
    return this.accountRepository.update(accountId, accountchange).accountType;
  }

  /**
   * Borrar una cuenta
   *
   * @param {string} accountId
   * @memberof AccountService
   */
  deleteAccount(accountId: string): void {
    this.accountRepository.delete(accountId);
  }
}
