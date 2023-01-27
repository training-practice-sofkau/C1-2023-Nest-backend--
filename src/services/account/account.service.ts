import { ConflictException, Injectable } from '@nestjs/common';
import { AccountModel } from 'src/models';
import { AccountEntity } from 'src/persistence/entities';
import { AccountRepository } from 'src/persistence/repositories';

@Injectable()
export class AccountService {
  constructor(private readonly accountRepository: AccountRepository) {}

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
}
