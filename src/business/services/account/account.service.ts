import { Injectable } from '@nestjs/common';
import { NewAccountDTO } from '../../dtos';
import { AccountEntity, AccountTypeEntity } from '../../persistence';

/**
 * Servicio para el manejo de las cuentas bancarias
 *
 * @export
 * @class AccountService
 */
@Injectable()
export class AccountService {
  /**
   * Crear una cuenta
   *
   * @param {NewAccountDTO} account
   * @return {*}  {AccountEntity}
   * @memberof AccountService
   */
  createAccount(account: NewAccountDTO): AccountEntity {
    throw new Error('Method not implemented.');
  }

  /**
   * Obtener el balance de una cuenta
   *
   * @param {string} accountId
   * @return {*}  {number}
   * @memberof AccountService
   */
  getBalance(accountId: string): number {
    const account = this.accountRepository.findOneById(accountId);
    if (!account) {
      throw new Error('La cuenta no existe');
    }
    if(account.deletedAt){
       throw new Error('La cuenta se ha eliminado');
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
    const account = this.accountRepository.findOneById(accountId);
    if(!account) {
      throw new Error('La cuenta no existe');
    }
    account.balance += amount;
    this.accountRepository.update(accountId, account);
  }

  /**
   * Remover balance de una cuenta
   *
   * @param {string} accountId
   * @param {number} amount
   * @memberof AccountService
   */
  removeBalance(accountId: string, amount: number): void {
    const account = this.accountRepository.findOneById(accountId);
    if (account.balance < amount) {
      throw new Error('Saldo insuficiente');
    }

    account.balance -= amount;

    this.accountRepository.delete(accountId);
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
    if (account.balance < amount) {
        return false;
    }
    return true;
}
    
  /**
   * Obtener el estado de una cuenta
   *
   * @param {string} accountId
   * @return {*}  {boolean}
   * @memberof AccountService
   */
  getState(accountId: string): boolean {
    const state1 = this.accountRepository.findOneById(accountId);
    if (state1.state === true){
      return true;
    }
    return false;
  }

  /**
   * Cambiar el estado de una cuenta
   *
   * @param {string} accountId
   * @param {boolean} state
   * @memberof AccountService
   */
  changeState(accountId: string, state: boolean): void {
    const newstate = this.accountRepository.findOneById(accountId);
    newstate.state = state
    this.accountRepository.update(accountId, newstate)
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
    return account.accountType
  }

  /**
   * Cambiar el tipo de cuenta a una cuenta
   *
   * @param {string} accountId
   * @param {string} accountTypeId
   * @return {*}  {AccountTypeEntity}
   * @memberof AccountService
   */
  changeAccountType( accountId: string, accountTypeId: string, ): AccountTypeEntity {
    throw new Error('This method is not implemented');
  }

  /**
   * Borrar una cuenta
   *
   * @param {string} accountId
   * @memberof AccountService
   */
  deleteAccount(accountId: string): void {
    const account = this.accountRepository.findOneById(accountId)
  }
}