import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AccountModel } from 'src/models';
import { AccountEntity, AccountTypeEntity, CustomerEntity } from 'src/persistence/entities';
import { AccountRepository } from 'src/persistence/repositories/account.repository';
import { AccountTypeRepository } from 'src/persistence/repositories/account-type.repository';
import { NewAccountDTO } from 'src/dtos/account/new-account.dto';

@Injectable()
export class AccountService {
  constructor(
    private readonly accountRepository: AccountRepository,
    private readonly accountTypeRepository: AccountTypeRepository,
  ) { }

  findAll(): AccountEntity[] {
    return this.accountRepository.findAll()
  }

  /**
   * Crear una cuenta
   *
   * @param {AccountModel} account
   * @return {*}  {AccountEntity}
   * @memberof AccountService
   */
  createAccount(account: NewAccountDTO): AccountEntity {
    const newAccount = new AccountEntity();
    const newCustomer = new CustomerEntity()
    newCustomer.id = account.customer;
    const newAccountType = new AccountTypeEntity()
    newAccountType.id = account.accountType
    const findAccount = this.accountRepository.findByCustomerId(
      account.customer
    );
    if (findAccount) {
      throw new BadRequestException();
    } else {
      console.log(newAccount)
      newAccount.customer = newCustomer;
      newAccount.accountType = newAccountType;
      return this.accountRepository.register(newAccount);
    }
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
    if (account) {
      if (account.state) {
        return account.balance;
      } else {
        throw new NotFoundException('La cuenta no se encuentra activa');
      }
    } else {
      throw new NotFoundException('No se encontro ninguna cuenta con ese ID');
    }
  }

  /**
   * Agregar balance a una cuenta
   *
   * @param {string} accountId
   * @param {number} amount
   * @memberof AccountService
   */
  addBalance(accountId: string, amount: number): void {
    const balance = this.getBalance(accountId);
    if (balance) {
      const account = this.accountRepository.findOneById(accountId);
      account.balance = account.balance + amount;
      this.accountRepository.update(accountId, account);
    }
  }

  /**
   * Remover balance de una cuenta
   *
   * @param {string} accountId
   * @param {number} amount
   * @memberof AccountService
   */
  removeBalance(accountId: string, amount: number): void {
    const balance = this.getBalance(accountId);
    if (balance) {
      const account = this.accountRepository.findOneById(accountId);
      if (account.balance >= amount) {
        account.balance = account.balance - amount;
      } else {
        throw new NotFoundException('No se puede realizar esta operacion');
      }

      this.accountRepository.update(accountId, account);
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
    const balance = this.getBalance(accountId);
    if (balance && balance >= amount) {
      return true;
    } else {
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
    const accountState = this.accountRepository.findByStateId(accountId);
    if (accountState != undefined) {
      return accountState;
    } else {
      throw new NotFoundException('No se encontro cuenta con ese ID');
    }
  }

  /**
   * Cambiar el estado de una cuenta
   *
   * @param {string} accountId
   * @param {boolean} state
   * @memberof AccountService
   */
  changeState(accountId: string, state: boolean): void {
    const account = this.accountRepository.findOneById(accountId);
    if (account) {
      const accountTypeState = this.accountTypeRepository.findByStateId(
        account.accountType.id,
      );
      if (accountTypeState) {
        account.state = state;
      } else {
        throw new NotFoundException(
          'No se puede cambiar de estado, ya que el tipo de cuenta esta en ' +
          accountTypeState,
        );
      }
    }
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
    const accountType =
      this.accountRepository.findByAccountTypeId(accountTypeId);
    if (accountType) {
      throw new BadRequestException(
        'El ID del tipo de cuenta ya tiene una cuenta asociada.',
      );
    } else {
      account.accountType.id = accountTypeId;
      this.accountRepository.update(accountId, account);
      return this.accountTypeRepository.update(accountTypeId, accountType);
    }
  }

  /**
   * Borrar una cuenta
   *
   * @param {string} accountId
   * @memberof AccountService
   */
  deleteAccount(accountId: string): void {
    const balance = this.getBalance(accountId);
    if (balance > 0) {
      throw new NotFoundException('No se puede eliminar');
    } else {
      const state = this.getState(accountId);
      if (state) {
        throw new NotFoundException('No se puede eliminar');
      } else {
        this.accountRepository.delete(accountId);
      }
    }
  }
  findOneById(id: string): AccountEntity {
    return this.accountRepository.findOneById(id)
  }
  updateAccount(id: string, account: NewAccountDTO): AccountEntity {
    const findAccount = this.accountRepository.findOneById(id)
    const newAccount = new AccountEntity()
    const newCustomer = new CustomerEntity()
    newCustomer.id=account.customer
    const newAccounType = new AccountTypeEntity()
    newAccounType.id=account.accountType
    if (findAccount) {
      newAccount.balance = account.balance
      newAccount.accountType = newAccounType
      newAccount.customer = newCustomer
      return this.accountRepository.update(id, newAccount)
    }
    else {
      throw new NotFoundException("No se encontro la cuenta")
    }
  }
}
