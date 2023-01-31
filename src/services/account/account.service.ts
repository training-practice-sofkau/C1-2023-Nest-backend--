import { ConflictException, Injectable } from '@nestjs/common';
import { AccountModel } from 'src/models';
import { AccountEntity, AccountTypeEntity } from 'src/persistence/entities';
import {
  AccountRepository,
  AccountTypeRepository,
  CustomerRepository,
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
    private readonly customerRepository: CustomerRepository,
  ) {}
  //Retorna el liestado de todas las cuentas, este metodo solo se usaria para administradores pero por ahora todos
  getAllAccounts(): AccountEntity[] {
    return this.accountRepository.findAll();
  }

  //Creacion de cuentas
  createAccount(account: AccountModel): AccountEntity {
    const currentAccountType = this.accountTypeRepository.findOneById(
      account.accountType.id,
    );
    const currentCustomer = this.customerRepository.findOneById(
      account.customer.id,
    );
    const newAccount = new AccountEntity();
    newAccount.accountType = currentAccountType;
    newAccount.balance = 0;
    newAccount.customer = currentCustomer;
    this.accountRepository.register(newAccount);
    return newAccount;
  }

  //Consultar solo cuentas activas
  private getOneActiveState(accountId: string): AccountEntity {
    if (this.getState(accountId)) {
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
  getAccountType(accountTypeId: string): AccountTypeEntity {
    return this.accountTypeRepository.findOneById(accountTypeId);
  }

  //Cambiar el tipo de cuenta
  changeAccountType(accountId: string, accountTypeId: string): AccountEntity {
    const currentAccount = this.accountRepository.findOneById(accountId);
    const currentAccountType =
      this.accountTypeRepository.findOneById(accountTypeId);
    currentAccount.accountType = currentAccountType;
    return this.accountRepository.upate(accountId, currentAccount);
  }

  //Eliminar una cuenta
  deleteAccount(accountId: string): void {
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
  getAccountsByCustomer(customerId: string): AccountEntity[] {
    return this.accountRepository.findByCustomer(customerId);
  }
}
