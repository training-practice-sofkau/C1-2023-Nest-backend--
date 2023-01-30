import { ConflictException, Injectable } from '@nestjs/common';
import { AccountModel } from 'src/models';
import { AccountEntity, AccountTypeEntity } from 'src/persistence/entities';
import {
  AccountRepository,
  AccountTypeRepository,
  DepositRepository,
  TransferRepository,
} from 'src/persistence/repositories';

@Injectable()
export class AccountService {
  constructor(
    private readonly accountRepository: AccountRepository,
    private readonly accountTypeRepository: AccountTypeRepository,
    private readonly transferRepository: TransferRepository,
    private readonly depositRepository: DepositRepository,
  ) {}

  //Creacion de cuentas
  async createAccount(account: AccountModel): Promise<AccountEntity> {
    const newAccount = new AccountEntity();
    newAccount.accountType = account.accountType;
    newAccount.balance = 0;
    newAccount.customer = account.customer;
    this.accountRepository.register(newAccount);
    return newAccount;
  }

  //Consultar solo cuentas activas
  private async getOneActiveState(accountId: string): Promise<AccountEntity> {
    if (await this.getState(accountId)) {
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
  async getAccountType(accountTypeId: string): Promise<AccountTypeEntity> {
    return this.accountTypeRepository.findOneById(accountTypeId);
  }

  //Cambiar el tipo de cuenta
  async changeAccountType(
    accountId: string,
    accountTypeId: string,
  ): Promise<AccountEntity> {
    const currentAccount = this.accountRepository.findOneById(accountId);
    const currentAccountType =
      this.accountTypeRepository.findOneById(accountTypeId);
    currentAccount.accountType = currentAccountType;
    return this.accountRepository.upate(accountId, currentAccount);
  }

  //Eliminar una cuenta
  async deleteAccount(accountId: string): Promise<void> {
    const currentDeposits = this.depositRepository.findByAccountId(accountId);
    currentDeposits.forEach((d) => this.depositRepository.delete(d.id, true));
    const currentTransfersIncome =
      this.transferRepository.findByIncomeAccount(accountId);
    const currentTransfersOutcome =
      this.transferRepository.findByOutcomeAccount(accountId);
    currentTransfersIncome.forEach((i) =>
      this.transferRepository.delete(i.id, true),
    );
    currentTransfersOutcome.forEach((i) =>
      this.transferRepository.delete(i.id, true),
    );
    this.accountRepository.delete(accountId, true);
  }

  //Trae todas las cuentas relacionadas al cliente
  async getAccountsByCustomer(customerId: string): Promise<AccountEntity[]> {
    return this.accountRepository.findByCustomer(customerId);
  }

  //Retorna el liestado de todas las cuentas, este metodo solo se usaria para administradores pero por ahora todos
  async getAllAccounts(): Promise<AccountEntity[]> {
    return this.accountRepository.findAll();
  }
}
