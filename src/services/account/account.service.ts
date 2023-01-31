import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { timeStamp } from 'console';
import { AccountModel } from 'src/models';
import { AccountEntity, AccountTypeEntity } from 'src/persistence/entities';
import { AccountRepository } from '../../persistence/repositories';
import { AccountTypeRepository } from '../../persistence/repositories/account-type.repository';


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
    newAccount.id = account.id;
    newAccount.customer = account.customer;
    newAccount.accountType = account.accountType;
    newAccount.balance = account.balance;
    newAccount.state = account.state;
    newAccount.deleteAt = account.delatedAt ;
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
  addBalance(accountId: string, amount: number): void {

   this.accountRepository.findOneById(accountId).balance += amount;
  }
  /**
   * Remover balance de una cuenta
   *
   * @param {string} accountId
   * @param {number} amount
   * @memberof AccountService
   */
  removeBalance(accountId: string, amount: number): void {
   if(this.verifyAmountIntoBalance(accountId , amount)){
    this.accountRepository.findOneById(accountId).balance -= amount;
   }else{
    throw new NotFoundException(Error , ' No se puede ajecutar esta petición')
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
    if (this.accountRepository.findOneById(accountId).balance >= amount){
      return true ;
    }else{
      return false;
    }
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
    return this.accountRepository.findOneById(accountId).accountType
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
   
    const accountType = this.accountRepository.findOneById(accountId);
    accountType.accountType.id = accountTypeId;
    return this.accountRepository.update(accountId, accountType).accountType
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

// Entrega dia 4 semana 1







