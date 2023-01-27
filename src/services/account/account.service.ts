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
  async createAccount(account: AccountModel): Promise<AccountEntity> {
    const newAccount = new AccountEntity();
    newAccount.acountType = account.acountType;
    newAccount.balance = 0;
    newAccount.customer = account.customer;
    this.accountRepository.register(newAccount);
    return newAccount;
  }

  //Consultar solo cuentas activas
  async getOneActiveState(accountId: string): Promise<AccountEntity> {
    if (!this.getState(accountId)) {
      throw new ConflictException('Cuenta inactiva');
    }
    const currentAccount = this.accountRepository.findOneById(accountId);
    return currentAccount;
  }

  //Obtención del balance por cuenta
  async getBalance(accountId: string): Promise<number> {
    const currentAccount = this.getOneActiveState(accountId);
    return (await currentAccount).balance;
  }

  //Agrega balance a la cuenta -- actualiza el balance
  async addBalance(accountId: string, amount: number): Promise<void> {
    const currentAccount = this.getOneActiveState(accountId);
    (await currentAccount).balance += amount;
    this.accountRepository.upate(accountId, await currentAccount);
  }

  //Remueve o elimina balance de la cuenta -- resta valor a la cuenta
  async removeBalance(accountId: string, amount: number): Promise<void> {
    const currentAccount = this.getOneActiveState(accountId);
    if (!this.verifyAmountToRemoveBalance(accountId, amount)) {
      throw new ConflictException('Saldo insuficiente');
    }
    (await currentAccount).balance -= amount;
    this.accountRepository.upate(accountId, await currentAccount);
  }

  //Validar la disponibilidad del monto a retirar o a reducir
  async verifyAmountToRemoveBalance(
    accountId: string,
    amount: number,
  ): Promise<boolean> {
    return (await this.getBalance(accountId)) < amount;
  }

  //Obtener el estado de una cuenta
  async getState(accountId: string): Promise<boolean> {
    const currentAccount = this.accountRepository.findOneById(accountId);
    return currentAccount.state;
  }

  //Actualiza o cambia el estado de una cuenta
  async changeState(accountId: string, newState: boolean): Promise<void> {
    const currentAccount = this.accountRepository.findOneById(accountId);
    if (
      (await this.getBalance(accountId)) != 0 &&
      (await this.getState(accountId))
    ) {
      throw new ConflictException('No se puede inactivar una cuenta con saldo');
    }
    currentAccount.state = newState;
    this.accountRepository.upate(accountId, currentAccount);
  }

  //Obtiene el tipo de cuenta de la cuenta informada
  async getAccountType(accountId: string): Promise<AccountEntity> {
    return this.accountRepository.findOneById(accountId);
  }

  //Cambiar el tipo de cuenta
  async changeAccountType(
    accountId: string,
    accountTypeId: string,
  ): Promise<AccountEntity> {
    const currentAccount = this.accountRepository.findOneById(accountId);
    const currentAccountType =
      this.accountTypeRepository.findOneById(accountTypeId);
    currentAccount.acountType = currentAccountType;
    return this.accountRepository.upate(accountId, currentAccount);
  }

  //Eliminar una cuenta
  async deleteAccount(accountId: string): Promise<void> {
    const currentAccount = this.accountRepository.findOneById(accountId);
    this.changeState(accountId, false);
    //Usar servicios de transferencias y de depositos para eliminar
  }
}
