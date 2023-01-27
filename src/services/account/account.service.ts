import { Injectable } from '@nestjs/common';
import { AccountEntity } from 'src/persistence/entities/account.entity';
import { AccountRepository } from '../../persistence/repositories';
import { AccountModel } from 'src/models';
@Injectable()
export class AccountService {
  constructor(private readonly accountRepository: AccountRepository) {}

  /**
   * Crear una cuenta
   *
   * @param {AccountModel} account
   * @return {*}  {AccountEntity}
   * @memberof AccountService
   */
  createAccount(account: AccountModel): AccountEntity {
    const newAccount = new AccountEntity();
    newAccount.customer = account.customer;
    const accountType = newAccount.accountType;
    accountType = account.accountType;
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
    const account = this.accountRepository.findById(accountId);
    if (!account) {
      throw new Error('La cuenta no existe');
    }
    if(account.deletedAt){
       throw new Error('La cuenta se ha eliminado');
    }
    if(account.state !== 'active'){
       throw new Error('La cuenta no esta activa');
    }
    return account.balance;
  }

  /**
   * Agregar balance a una cuenta
   *
   * @param {string} accountId
   * @param {number} amount
   * @memberof AccountService
   */
  addBalance(accountId: string, amount: number): void {
    const account = this.accountRepository.find(accountId);
    if(!account) {
      throw new Error('La cuenta no existe');
    }
    if(account.deleteAt) {
      throw new Error('La cuenta ha sido eliminada');
    }
    if(account.balance < amount) {
      throw new Error('Saldo insuficiente');
    }
    account.balance -= amount;
    this.accountRepository.update(account);
  }
  

  /**
   * Remover balance de una cuenta
   *
   * @param {string} accountId
   * @param {number} amount
   * @memberof AccountService
   */
  removeBalance(accountId: string, amount: number): void {
    // Obtener la cuenta correspondiente a la id especificada
    const account = this.accountRepository.findOneById(accountId);

    // Verificar si la cuenta existe y no ha sido eliminada
    if (!account || account.deletedAt) {
      throw new Error('La cuenta no existe o ha sido eliminada');
    }

    // Verificar si el saldo de la cuenta es suficiente para realizar la transacción
    if (account.balance < amount) {
      throw new Error('Saldo insuficiente');
    }

    // Actualizar el saldo de la cuenta
    account.balance -= amount;

    // Guardar los cambios en el repositorio
    this.accountRepository.delete(account);
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
    throw new Error('This method is not implemented');
  }

  /**
   * Obtener el estado de una cuenta
   *
   * @param {string} accountId
   * @return {*}  {boolean}
   * @memberof AccountService
   */
  getState(accountId: string): boolean {
    throw new Error('This method is not implemented');
  }

  /**
   * Cambiar el estado de una cuenta
   *
   * @param {string} accountId
   * @param {boolean} state
   * @memberof AccountService
   */
  changeState(accountId: string, state: boolean): void {
    throw new Error('This method is not implemented');
  }

  /**
   * Obtener el tipo de cuenta de una cuenta
   *
   * @param {string} accountId
   * @return {*}  {AccountTypeEntity}
   * @memberof AccountService
   */
  getAccountType(accountId: string): AccountTypeEntity {
    throw new Error('This method is not implemented');
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
    throw new Error('This method is not implemented');
  }

  /**
   * Borrar una cuenta
   *
   * @param {string} accountId
   * @memberof AccountService
   */
  deleteAccount(accountId: string): void {
    throw new Error('This method is not implemented');
  }
}
