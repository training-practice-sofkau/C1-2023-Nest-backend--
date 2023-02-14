import { NewAccountDTO } from 'src/business/dtos/new-account.dto';
import { Injectable } from '@nestjs/common';
import { AccountEntity } from 'src/data/persistence/entities/account.entity';
import { AccountRepository, AccountTypeRepository, CustomerRepository } from 'src/data/persistence/repositories';
import { AccountModel } from 'src/data/models';
import { AccountTypeEntity } from 'src/data/persistence/entities/account-type.entity';


@Injectable()
export class AccountService {
  constructor(private readonly accountRepository: AccountRepository, private readonly accountTypeRepository: AccountTypeRepository,
    private readonly customerRepository: CustomerRepository,) {}

  /**
   * Crear una cuenta
   *
   * @param {AccountModel} account
   * @return {*}  {AccountEntity}
   * @memberof AccountService
   */
  createAccount(account: NewAccountDTO): AccountEntity {
    const newAccount = new AccountEntity();
    newAccount.customer = this.customerRepository.findOneById(account.Customer);
    newAccount.accountType = this.accountTypeRepository.findOneById(
      account.accountType,
    );
    newAccount.balance = Number(account.balance);
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
    let account = new AccountEntity();
    account = this.accountRepository.findOneById(accountId);
    account.balance = Number(account.balance) + Number(amount);
    this.accountRepository.update(accountId, account);
    return account.balance;
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
    const account = this.accountRepository.findOneById(accountId);
    if (account.balance < amount) {
        return false;
    }
    return true;
}
  getAccount(accountId: string): AccountTypeEntity {
    let newAccount = new AccountTypeEntity();
    newAccount = this.accountRepository.findOneById(accountId).accountType;
    return newAccount;
  }
  
  // encontrar los datos de la cuenta por el id del usuario
  getAccountId(customerId: string): AccountEntity[] {
    return this.accountRepository.findByCustomer(customerId);
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