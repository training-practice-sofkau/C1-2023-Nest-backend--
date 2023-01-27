import { ConflictException, Injectable } from '@nestjs/common';
import { AccountModel } from 'src/models';
import { AccountEntity } from 'src/persistence/entities';
import {
  AccountRepository,
  AccountTypeRepository,
} from 'src/persistence/repositories';
import { DepositService, TransferService } from 'src/services';

@Injectable()
export class AccountService {
  constructor(
    private readonly accountRepository: AccountRepository,
    private readonly accountTypeRepository: AccountTypeRepository,
    private readonly transferService: TransferService,
    private readonly depositService: DepositService,
  ) {}

  //Creacion de cuentas
  createAccount(account: AccountModel): AccountEntity {
    const newAccount = new AccountEntity();
    newAccount.acountType = account.acountType;
    newAccount.balance = 0;
    newAccount.customer = account.customer;
    this.accountRepository.register(newAccount);
    return newAccount;
  }

  //Consultar solo cuentas activas
  getOneActiveState(accountId: string): AccountEntity {
    if (!this.getState(accountId)) {
      throw new ConflictException('Cuenta inactiva');
    }
    const currentAccount = this.accountRepository.findOneById(accountId);
    return currentAccount;
  }

  //Obtención del balance por cuenta
  getBalance(accountId: string): number {
    const currentAccount = this.getOneActiveState(accountId);
    return currentAccount.balance;
  }

  //Agrega balance a la cuenta -- actualiza el balance
  addBalance(accountId: string, amount: number): void {
    const currentAccount = this.getOneActiveState(accountId);
    currentAccount.balance += amount;
    this.accountRepository.upate(accountId, currentAccount);
  }

  //Remueve o elimina balance de la cuenta -- resta valor a la cuenta
  removeBalance(accountId: string, amount: number): void {
    const currentAccount = this.getOneActiveState(accountId);
    if (!this.verifyAmountToRemoveBalance(accountId, amount)) {
      throw new ConflictException('Saldo insuficiente');
    }
    currentAccount.balance -= amount;
    this.accountRepository.upate(accountId, currentAccount);
  }

  //Validar la disponibilidad del monto a retirar o a reducir
  verifyAmountToRemoveBalance(accountId: string, amount: number): boolean {
    return this.getBalance(accountId) < amount;
  }

  //Obtener el estado de una cuenta
  getState(accountId: string): boolean {
    const currentAccount = this.accountRepository.findOneById(accountId);
    return currentAccount.state;
  }

  //Actualiza o cambia el estado de una cuenta
  changeState(accountId: string, newState: boolean): void {
    const currentAccount = this.accountRepository.findOneById(accountId);
    if (this.getBalance(accountId) != 0 && this.getState(accountId)) {
      throw new ConflictException('No se puede inactivar una cuenta con saldo');
    }
    currentAccount.state = newState;
    this.accountRepository.upate(accountId, currentAccount);
  }

  //Obtiene el tipo de cuenta de la cuenta informada
  getAccountType(accountId: string): AccountEntity {
    return this.accountRepository.findOneById(accountId);
  }

  //Cambiar el tipo de cuenta
  changeAccountType(accountId: string, accountTypeId: string): AccountEntity {
    const currentAccount = this.accountRepository.findOneById(accountId);
    const currentAccountType =
      this.accountTypeRepository.findOneById(accountTypeId);
    currentAccount.acountType = currentAccountType;
    return this.accountRepository.upate(accountId, currentAccount);
  }

  //Eliminar una cuenta
  deleteAccount(accountId: string): void {
    const currentAccount = this.accountRepository.findOneById(accountId);
    this.changeState(accountId, false);
    //Usar servicios de transferencias y de depositos para eliminar
  }
}
